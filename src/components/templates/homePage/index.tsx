// hooks
import useTmdbFetch from "@/hooks/tmdb";

// componentes
import HeaderCarousel from "@/components/organisms/headerCarousel";
import MovieSerieCarousel from "@/components/organisms/moviesSeriesCarousel";
import { CarouselTitle } from "@/components/atoms/carouselTitle";
import { StopLoading } from "@/components/atoms/stopLoading";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

// funções utilitarias
import { getContentId } from "@/utils/tmdbApiData/id";
import { checkAvailability } from "@/utils/tmdbApiData/availability";
import { ScrollToTop } from "@/utils/globalActions/scrollToTop";

import { tmdbGenres } from "@/app/constants";

export default async function HomePage() {

    const slidesData: Record<string, tmdbObjProps[] | undefined> = {};
    let isDataLoaded = false; 
    const {
        fetchMoviesByGenre,
        fetchAllTrending,
        fetchPopularSeries,
        fetchSeriesByIdList,
        fetchMoviesByIdList,
        fetchPopularMovies
    } = useTmdbFetch();

    try {
        const popularMovies = await fetchPopularMovies();
        const moviesIdList = await getContentId(popularMovies);
        const movies = await fetchMoviesByIdList(moviesIdList);
        slidesData.headerSlidesData = await checkAvailability(movies);
        slidesData.fictionMovies = await fetchMoviesByGenre('878');
        slidesData.horrorMovies = await fetchMoviesByGenre('27');
        slidesData.cartoonShows = await fetchMoviesByGenre('16');
        slidesData.allTrending = await fetchAllTrending();
        const popularSeries = await fetchPopularSeries();
        const idList = await getContentId(popularSeries);
        const series = await fetchSeriesByIdList(idList);
        slidesData.popularSeries = await checkAvailability(series);
        isDataLoaded = true;
    } catch (error) {
        console.error(error);
    };

    return (
        <section className="min-h-screen">
            <HeaderCarousel
                slidesType="movie"
                slidesData={slidesData.headerSlidesData}
                currentPage="home"
            />

            <div className="w-[calc(100%-40px)] mx-auto h-px bg-secondary/5 sm:hidden my-10" />

            <div className="flex flex-col mb-14 sm:mb-0  sm:-translate-y-[71px] z-10 relative">
                {slidesData.allTrending && (
                    <>
                        {/* Carousel com filmes de ficção */}
                        <div className="flex flex-col gap-y-4">
                            {/* Titulo */}
                            <CarouselTitle className="ml-5 sm:ml-10 lg:ml-[70px]">
                                {tmdbGenres.trending.title}
                            </CarouselTitle>
                            {/* Carousel */}
                            <MovieSerieCarousel slidesData={slidesData.allTrending} slidesType='mixed' />
                        </div>

                        <div className="w-full h-px my-11 lg:mt-12 lg:mb-10 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                    </>
                )}

                {slidesData.cartoonShows && (
                    <>
                        {/* Carousel com desenhos/animes */}
                        <div className="flex flex-col gap-y-4">
                            {/* Titulo */}
                            <CarouselTitle className="ml-5 sm:ml-10 lg:ml-[70px]">
                                {tmdbGenres.cartoon.title}
                            </CarouselTitle>
                            {/* Carousel */}
                            <MovieSerieCarousel slidesData={slidesData.cartoonShows} slidesType='movie' />
                        </div>

                        <div className="w-full h-px my-11 lg:mt-12 lg:mb-10 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                    </>
                )}

                {slidesData.horrorMovies && (
                    <>
                        {/* Carousel com filmes de terror */}
                        <div className="flex flex-col gap-y-4">
                            {/* Titulo */}
                            <CarouselTitle className="ml-5 sm:ml-10 lg:ml-[70px]">
                                {tmdbGenres.horror.title}
                            </CarouselTitle>
                            {/* Carousel */}
                            <MovieSerieCarousel slidesData={slidesData.horrorMovies} slidesType='movie' />
                        </div>

                        <div className="w-full h-px my-11 lg:mt-12 lg:mb-10 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                    </>
                )}

                {slidesData.popularSeries && (
                    <>
                        {/* Carousel com series populares */}
                        <div className="flex flex-col gap-y-4">
                            <CarouselTitle className="ml-5 sm:ml-10 lg:ml-[70px]">
                                {tmdbGenres.popular.title}
                            </CarouselTitle>
                            <MovieSerieCarousel slidesData={slidesData.popularSeries} slidesType='serie' />
                        </div>

                        <div className="w-full h-px my-11 lg:mt-12 lg:mb-10 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                    </>
                )}

                {slidesData.fictionMovies && (
                    <>
                        {/* Carousel com filmes de ficção */}
                        <div className="flex flex-col gap-y-4">
                            {/* Titulo */}
                            <CarouselTitle className="ml-5 sm:ml-10 lg:ml-[70px]">
                                {tmdbGenres.fiction.title}
                            </CarouselTitle>
                            {/* Carousel */}
                            <MovieSerieCarousel slidesData={slidesData.fictionMovies} slidesType='movie' />
                        </div>
                    </>
                )}
            </div>

            <ScrollToTop/>
            {isDataLoaded && <StopLoading/>}
        </section>
    );
};