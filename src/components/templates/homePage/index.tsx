// hooks
import useTmdbFetch from "@/hooks/tmdb";
// componentes
import HeaderCarousel from "@/components/organisms/headerCarousel";
import { StopLoading } from "@/components/atoms/stopLoading";
import { ScrollToTop } from "@/utils/globalActions/scrollToTop";
import CarouselWrapper from './CarouselWrapper';
// utilitarios
import { checkAvailability } from "@/utils/tmdb/checkAvailability";
import { formatLangCode } from "@/utils/i18n";
import { sortByVoteAverageDesc } from "@/utils/tmdb/sortByAverageNote";
import { makeMediaUnique } from "@/utils/tmdb/removeDuplicates";
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { Platform } from "@/app/[lang]/constants";
// traduções
import translations from '@/i18n/translations/sections/translations.json';

type CarouselProps = Record<string, {
    data: TmdbMediaProps[];
    title: string;
    type: 'default' | 'featured' | 'hero';
}>;

export default async function HomePage({ lang }: { lang: string }) {
    const langCode = formatLangCode(lang);
    const {
        fetchAllTrending,
        fetchPlatformContent,
        fetchMovieById,
        fetchSeriebyId,
        fetchTopRatedSeries,
        fetchReleasedMovies,
        fetchReleasedSeries,
        fetchMovieClassics
    } = useTmdbFetch();
    const carouselsData: CarouselProps = {};
    const titles = translations[langCode];
    const safeCheck = async (data: any) => await checkAvailability(data ?? []) ?? [];
    const withMediaType = (arr: any[], type: "movie" | "tv", streaming?: Platform) =>
        arr.map(item => ({ ...item, media_type: type, streaming }));

    const shuffle = (array: TmdbMediaProps[]) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    try {
        /** ---------------- HEADER / HERO CAROUSEL ---------------- */
        const allTrending = await fetchAllTrending("all", lang) ?? [];
        const allTrendingsAvailable = await safeCheck(allTrending);
        const headerSlides = (
            await Promise.all(
                allTrendingsAvailable.map(async (item) => {
                    const res = item.media_type === "movie"
                        ? await fetchMovieById(item.id, lang)
                        : await fetchSeriebyId(item.id, lang);

                    return res ? { ...res, media_type: item.media_type } : null;
                })
            )
        ).filter(Boolean).slice(0, 6) as TmdbMediaProps[];
        carouselsData.headerSlides = {
            data: headerSlides,
            title: '',
            type: 'hero'
        };

        /** ---------------- TRENDING SECTION ---------------- */
        carouselsData.allTrending = {
            data: allTrendingsAvailable,
            title: titles.trending,
            type: 'default'
        };

        /** ---------------- TOP RATED SECTION ---------------- */
        const topRated = await fetchTopRatedSeries(lang);
        const topRatedAvailable = await safeCheck(topRated) ?? [];
        const topSeries = (
            await Promise.all(
                topRatedAvailable.map(async (serie) => {
                    const res = await fetchSeriebyId(serie.id, lang);
                    return res ? { ...res, media_type: 'tv' } : null;
                })
            ) as TmdbMediaProps[]
        );
        carouselsData.topRatedSeries = {
            data: topSeries,
            title: titles.top_10_series,
            type: 'featured'
        };

        /** ----------------- RELESEAD MEDIA ------------------ */
        const releasedMovies = await fetchReleasedMovies(1, lang);
        const releasedMoviesFiltered = (await safeCheck(releasedMovies)).filter((_, index) => index <= 14);
        const releasedSeries = await fetchReleasedSeries(1, lang);
        const releasedSeriesFiltered = (await safeCheck(releasedSeries)).filter((_, index) => index <= 14);
        const releasedMedia = shuffle([...releasedMoviesFiltered, ...releasedSeriesFiltered]);
        carouselsData.releasedMedia = {
            data: releasedMedia,
            title: titles.releases,
            type: 'default'
        };

        /** ---------------- THE BEST OF STREAMING ---------------- */
        const bestStreamingMedia: TmdbMediaProps[] = [];
        const platforms: Platform[] = ["netflix", "disneyPlus", "HBO", "paramount", "primeVideo", "crunchyroll"];
        for (const platform of platforms) {
            const [series, movies] = await Promise.all([
                fetchPlatformContent(platform as Platform, "tv", 1, langCode),
                fetchPlatformContent(platform as Platform, "movie", 1, langCode)
            ]);
            const filteredSeries = await safeCheck(series);
            const filteredMovies = await safeCheck(movies);
            const bestMedias = [
                ...sortByVoteAverageDesc(withMediaType(filteredSeries, "tv", platform)).filter((_, index) => index < 5),
                ...sortByVoteAverageDesc(withMediaType(filteredMovies, "movie", platform)).filter((_, index) => index < 5)
            ];
            bestStreamingMedia.push(...bestMedias);
        };
        carouselsData.bestOfStreamings = {
            data: shuffle(makeMediaUnique(bestStreamingMedia)),
            title: titles.best_streamings,
            type: 'default'
        };

        /** ---------------- Movie classics ----------------- */
        const [classicMovies, classicSeries] = await Promise.all([
            fetchMovieClassics('movie', 1, langCode),
            fetchMovieClassics('tv', 1, langCode)
        ]);
        const filteredClassicMovies = await safeCheck(classicMovies);
        const filteredClassicSeries = await safeCheck(classicSeries);
        carouselsData.movieClassics = {
            data: shuffle([...filteredClassicMovies, ...filteredClassicSeries]),
            title: titles.cinema_classics,
            type: 'default'
        };

    } catch (err) {
        console.error("HomePage fetch error:", err);
    };

    return (
        <section className="min-h-screen">
            {/* HERO */}
            <HeaderCarousel
                slidesData={carouselsData.headerSlides?.data ?? []}
                currentPage="home"
                lang={langCode}
            />

            {/* MAIN CAROUSELS */}
            <div className="flex flex-col mt-12 mb-6 relative z-10 sm:-mt-[calc((56vw*0.25)-100px)]">
                {Object.entries(carouselsData).map(([key, carousel], index) =>
                    index > 0 && carousel.title ? (
                        <CarouselWrapper
                            key={`home-carousel-${carousel.title}-${key}`}
                            title={carousel.title}
                            data={carousel.data}
                            index={index}
                            lang={langCode}
                            carouselType={carousel.type !== 'hero' ? carousel.type : 'default'}
                        />
                    ) : null
                )}
            </div>
            <ScrollToTop />
            <StopLoading />
        </section>
    );
}
