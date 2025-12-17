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
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
// traduções
import translations from '@/i18n/translations/sections/translations.json';

type CarouselProps = Record<string, {
    data: TmdbMediaProps[];
    title: string;
    type: 'default' | 'featured' | 'hero';
}>;

export default async function HomePage({ lang }: { lang: string }) {
    let isDataLoaded = false;
    const langCode = formatLangCode(lang);
    const {
        fetchAllTrending,
        fetchPlatformContent,
        fetchMovieById,
        fetchSeriebyId,
        fetchTopRatedSeries
    } = useTmdbFetch();
    const carouselsData: CarouselProps = {};
    const titles = translations[langCode];
    const safeCheck = async (data: any) => await checkAvailability(data ?? []) ?? [];

    const withMediaType = (arr: any[], type: "movie" | "tv") =>
        arr.map(item => ({ ...item, media_type: type }));

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
        }

        /** ---------------- STREAMING PLATFORMS ---------------- */
        const platforms = [
            { key: "netflix", title: titles.netflix },
            { key: "disneyPlus", title: titles.disney },
            { key: "HBO", title: titles.hbo },
            { key: "paramount", title: titles.paramount },
            { key: "primeVideo", title: titles.prime }
        ] as const;

        for (const { key, title } of platforms) {
            const [series, movies] = await Promise.all([
                fetchPlatformContent(key, "tv", 1, lang),
                fetchPlatformContent(key, "movie", 1, lang)
            ]);
            const filteredSeries = await safeCheck(series);
            const filteredMovies = await safeCheck(movies);
            const formatted = [
                ...withMediaType(filteredSeries, "tv"),
                ...withMediaType(filteredMovies, "movie")
            ];
            carouselsData[key] = {
                data: formatted,
                title,
                type: 'default'
            };
        };
        isDataLoaded = true;

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
            {isDataLoaded && <StopLoading />}
        </section>
    );
}
