// hooks
import useTmdbFetch from "@/components/hooks/tmdb";

// componentes
import HeaderCarousel from "@/components/organisms/headerCarousel";
import MovieSerieCarousel from "@/components/organisms/moviesSeriesCarousel";
import { CarouselTitle } from "@/components/atoms/carouselTitle";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

// funções utilitarias
import { getContentId } from "@/components/utils/tmdbApiData/id";
import { checkAvailability } from "@/components/utils/tmdbApiData/availability";

import { tmdbGenres } from "@/app/constants";

export default async function HomePage() {
    
    const contentData: Record<string, tmdbObjProps[] | undefined> = {};
    const { 
        fetchMoviesByGenre,
        fetchReleasedMovies,
        fetchAllTrending,
        fetchPopularSeries,
        fetchSeriesByIdList,
        fetchMoviesByIdList,
        fetchPopularMovies
    } = useTmdbFetch();
   

    try {
        const popularMovies = await fetchPopularMovies();
        const moviesIdList = await getContentId( popularMovies );
        const movies = await fetchMoviesByIdList( moviesIdList );
        contentData.headerSlidesData = await checkAvailability( movies );
        contentData.fictionMovies = await fetchMoviesByGenre('878');
        contentData.horrorMovies = await fetchMoviesByGenre('27');
        contentData.cartoonShows = await fetchMoviesByGenre('16');
        contentData.allTrending = await fetchAllTrending();
        const popularSeries = await fetchPopularSeries();
        const idList = await getContentId( popularSeries );
        const series = await fetchSeriesByIdList( idList );
        contentData.popularSeries = await checkAvailability( series );
    } catch ( error ) {
        console.error( error );
    };

    return (
        <section className="min-h-screen">
            <HeaderCarousel 
                slidesType="movie" 
                slidesData={contentData.headerSlidesData}
                currentPage="home"
            />

            <div className="w-[calc(100%-40px)] mx-auto h-px bg-secondary/10 sm:hidden my-10"></div>

            <div className="flex flex-col gap-y-10 pb-6 lg:pb-0 px-5 sm:px-10 lg:px-[70px] sm:-translate-y-[71px] z-10 relative">
                {/* Carousel com filmes de ficção */}
                <div className="flex flex-col gap-y-5">
                    {/* Titulo */}
                    <CarouselTitle>{tmdbGenres.fiction.title}</CarouselTitle>
                    {/* Carousel */}
                    <MovieSerieCarousel contentData={contentData.fictionMovies} contentType='movie'/>
                </div>

                <div className="w-full h-px bg-secondary/10"></div>

                 {/* Carousel com desenhos/animes */}
                 <div className="flex flex-col gap-y-5">
                    {/* Titulo */}
                    <CarouselTitle>{tmdbGenres.cartoon.title}</CarouselTitle>
                    {/* Carousel */}
                    <MovieSerieCarousel contentData={contentData.cartoonShows} contentType='movie'/>
                </div>

                <div className="w-full h-px bg-secondary/10"></div>

                {/* Carousel com series populares */}
                <div className="flex flex-col gap-y-5">    
                    <CarouselTitle>Series populares</CarouselTitle>
                    <MovieSerieCarousel contentData={contentData.popularSeries} contentType='serie'/>
                </div>

                <div className="w-full h-px bg-secondary/10"></div>

                {/* Carousel com filmes de terror */}
                <div className="flex flex-col gap-y-5">
                    {/* Titulo */}
                    <CarouselTitle>{tmdbGenres.horror.title}</CarouselTitle>
                    {/* Carousel */}
                    <MovieSerieCarousel contentData={contentData.horrorMovies} contentType='movie'/>
                </div>
                
            </div>
        </section>
    );
};