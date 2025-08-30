// hooks
import useTmdbFetch from "@/hooks/tmdb";

// componentes
import HeaderCarousel from "@/components/organisms/heroCarousel";
import MovieSerieCarousel from "@/components/organisms/moviesSeriesCarousel";
import { CarouselTitle } from "@/components/atoms/carouselTitle";
import { StopLoading } from "@/components/atoms/stopLoading";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

// funções utilitarias
import { getContentId } from "@/utils/tmdbApiData/id";
import { checkAvailability } from "@/utils/tmdbApiData/availability";
import { ScrollToTop } from "@/utils/globalActions/scrollToTop";
import { sortByVoteAverageDesc } from '@/utils/tmdbApiData/sortByAverageNote';

import { tmdbGenres } from "@/app/constants";
import { fetchMoviesByIdList } from "@/hooks/tmdb/moviesByIdList";

export default async function HomePage() {

    const slidesData: Record<string, tmdbObjProps[] | undefined> = {};
    let isDataLoaded = false; 
    const {
        fetchMoviesByGenre,
        fetchAllTrending,
        fetchPopularSeries,
        fetchSeriesByIdList,
        fetchMoviesByIdList
    } = useTmdbFetch();

    try {
        const trendingMoviesData = await fetchAllTrending('movie');
        const trendingMoviesIds = await getContentId(trendingMoviesData);
        const trendingMovies = await fetchMoviesByIdList(trendingMoviesIds);
        const filteredTrendingMovies = await checkAvailability(trendingMovies);
        slidesData.headerSlidesData = sortByVoteAverageDesc(filteredTrendingMovies);
        slidesData.fictionMovies = await fetchMoviesByGenre('878');
        slidesData.horrorMovies = await fetchMoviesByGenre('27');
        slidesData.cartoonShows = await fetchMoviesByGenre('16');
        slidesData.allTrending = await fetchAllTrending();
        const popularSeriesData = await fetchPopularSeries();
        const popularIds = await getContentId(popularSeriesData);
        const popularSeries = await fetchSeriesByIdList(popularIds);
        slidesData.popularSeries = await checkAvailability(popularSeries);
        isDataLoaded = true;
    } catch (error) {
        console.error(error);
    };

    return (
        <section className="min-h-screen">
            <HeaderCarousel
                slidesType='movie'
                slidesData={slidesData.headerSlidesData}
                currentPage="home"
            />
            <div className="flex flex-col mt-8 mb-16 sm:mb-0  sm:-translate-y-[100px] z-10 relative">
                {slidesData.allTrending && (
                    <>
                        {/* Carousel com filmes de ficção */}
                        <div className="flex flex-col gap-y-8">
                            {/* Titulo */}
                            <CarouselTitle className="justify-between sm:justify-start mx-auto w-[calc(100%-40px)] sm:w-fit sm:mx-0 sm:ml-10 lg:ml-[70px]">
                                {tmdbGenres.trending.title}
                            </CarouselTitle>
                            {/* Carousel */}
                            <MovieSerieCarousel slidesData={slidesData.allTrending} slidesType='mixed' />
                        </div>

                        <div className="w-full h-px my-11 lg:my-8 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                    </>
                )}

                {slidesData.cartoonShows && (
                    <>
                        {/* Carousel com desenhos/animes */}
                        <div className="flex flex-col gap-y-8">
                            {/* Titulo */}
                            <CarouselTitle className="justify-between sm:justify-start mx-auto w-[calc(100%-40px)] sm:w-fit sm:mx-0 sm:ml-10 lg:ml-[70px]">
                                {tmdbGenres.cartoon.title}
                            </CarouselTitle>
                            {/* Carousel */}
                            <MovieSerieCarousel slidesData={slidesData.cartoonShows} slidesType='movie' />
                        </div>

                        <div className="w-full h-px my-11 lg:my-8 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                    </>
                )}

                {slidesData.horrorMovies && (
                    <>
                        {/* Carousel com filmes de terror */}
                        <div className="flex flex-col gap-y-8">
                            {/* Titulo */}
                            <CarouselTitle className="justify-between sm:justify-start mx-auto w-[calc(100%-40px)] sm:w-fit sm:mx-0 sm:ml-10 lg:ml-[70px]">
                                {tmdbGenres.horror.title}
                            </CarouselTitle>
                            {/* Carousel */}
                            <MovieSerieCarousel slidesData={slidesData.horrorMovies} slidesType='movie' />
                        </div>

                        <div className="w-full h-px my-11 lg:my-8 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                    </>
                )}

                {slidesData.popularSeries && (
                    <>
                        {/* Carousel com series populares */}
                        <div className="flex flex-col gap-y-8">
                            <CarouselTitle className="justify-between sm:justify-start mx-auto w-[calc(100%-40px)] sm:w-fit sm:mx-0 sm:ml-10 lg:ml-[70px]">
                                {tmdbGenres.popular.title}
                            </CarouselTitle>
                            <MovieSerieCarousel slidesData={slidesData.popularSeries} slidesType='serie' />
                        </div>

                        <div className="w-full h-px my-11 lg:my-8 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                    </>
                )}

                {slidesData.fictionMovies && (
                    <>
                        {/* Carousel com filmes de ficção */}
                        <div className="flex flex-col gap-y-8">
                            {/* Titulo */}
                            <CarouselTitle className="justify-between sm:justify-start mx-auto w-[calc(100%-40px)] sm:w-fit sm:mx-0 sm:ml-10 lg:ml-[70px]">
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