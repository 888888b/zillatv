// hooks
import useTmdbFetch from "@/hooks/tmdb";
// componentes
import HeaderCarousel from "@/components/organisms/heroCarousel";
import { StopLoading } from "@/components/atoms/stopLoading";
import { ScrollToTop } from "@/utils/globalActions/scrollToTop";
import CarouselWrapper from './CarouselWrapper';
// utilitarios
import { checkAvailability } from "@/utils/tmdbApiData/availability";
import { homeCarouselGenres as titles } from "@/app/constants";
// tipos
import { TmdbMediaProps, CarouselTitleType } from "@/app/types";

type CarouselDataType = Record<string, {
    data: TmdbMediaProps[];
    title?: CarouselTitleType;
}>;

export default async function HomePage() {
    let isDataLoaded = false;
    const {
        fetchAllTrending,
        fetchPlatformContent,
        fetchMovieById,
        fetchSeriebyId
    } = useTmdbFetch();
    const carouselsData: CarouselDataType = {};
    const safeCheck = async (data: any) => await checkAvailability(data ?? []) ?? [];

    const withMediaType = (arr: any[], type: "movie" | "tv") =>
        arr.map(item => ({ ...item, media_type: type }));

    try {
        /** ---------------- HEADER / HERO CAROUSEL ---------------- */
        const allTrending = await fetchAllTrending("all") ?? [];
        const allTrendingsAvailable = await safeCheck(allTrending);
        const headerSlides = (
            await Promise.all(
                allTrendingsAvailable.map(async (item) => {
                    const res = item.media_type === "movie"
                        ? await fetchMovieById(item.id)
                        : await fetchSeriebyId(item.id);

                    return res ? { ...res, media_type: item.media_type } : null;
                })
            )
        ).filter(Boolean).slice(0, 6) as TmdbMediaProps[];
        carouselsData.headerSlides = { data: headerSlides };

        /** ---------------- TRENDING SECTION ---------------- */
        carouselsData.allTrending = {
            data: allTrendingsAvailable,
            title: titles.trending.title
        };

        /** ---------------- STREAMING PLATFORMS ---------------- */
        const platforms = [
            { key: "netflix", title: titles.netflix.title },
            { key: "disneyPlus", title: titles.disneyPlus.title },
            { key: "HBO", title: titles.HBO.title },
            { key: "paramount", title: titles.paramount.title },
            { key: "primeVideo", title: titles.primeVideo.title }
        ] as const;

        for (const { key, title } of platforms) {
            const [series, movies] = await Promise.all([
                fetchPlatformContent(key, "tv"),
                fetchPlatformContent(key, "movie")
            ]);
            const filteredSeries = await safeCheck(series);
            const filteredMovies = await safeCheck(movies);
            const formatted = [
                ...withMediaType(filteredSeries, "tv"),
                ...withMediaType(filteredMovies, "movie")
            ];
            carouselsData[key] = { data: formatted, title };
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
            />

            {/* MAIN CAROUSELS */}
            <div className="flex flex-col mt-12 mb-16 relative z-10 sm:-mt-[clamp(0px,5.5vw,56px)]">
                {Object.entries(carouselsData).map(([key, carousel], index) =>
                    index > 0 && carousel?.title ? (
                        <CarouselWrapper
                            key={`home-carousel-${carousel.title}-${key}`}
                            title={carousel.title}
                            data={carousel.data}
                            index={index}
                        />
                    ) : null
                )}
            </div>
            <ScrollToTop />
            {isDataLoaded && <StopLoading />}
        </section>
    );
}
