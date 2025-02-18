// hooks
import useTmdbFetch from "@/components/hooks/tmdb";

// componentes
import HeaderCarousel from "@/components/organisms/headerCarousel";
import TrendingCarousel from "@/components/organisms/trendingCarousel";
import PopularSeriesCarousel from "@/components/organisms/popularCarousel";
import MovieSerieCarousel from "@/components/organisms/moviesSeriesCarousel";
import { CarouselDefaultTitle } from "@/components/atoms/carouselDefaultTitle";
import { CarouselFeatureTitle } from "@/components/atoms/carouselFeatureTitle";

// tipos
import { tmdbObjProps } from "@/components/contexts/tmdbContext";

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
        fetchMoviesByIdList
    } = useTmdbFetch();
   

    try {
        contentData.latestMovies = await fetchReleasedMovies();
        const moviesIdList = await getContentId( contentData.latestMovies );
        const movies = await fetchMoviesByIdList( moviesIdList );
        contentData.headerSlidesData = await checkAvailability( movies );
        contentData.fictionMovies = await fetchMoviesByGenre('878');
        contentData.horrorMovies = await fetchMoviesByGenre('27');
        contentData.documentaryMovies = await fetchMoviesByGenre('99');
        contentData.allTrending = await fetchAllTrending();
        const popularSeries = await fetchPopularSeries();
        const idList = await getContentId( popularSeries );
        const series = await fetchSeriesByIdList( idList );
        contentData.popularSeries = await checkAvailability( series );
    } catch ( error ) {
        console.error( error );
    };

    return (
        <section className="min-h-screen font-raleway">
            <HeaderCarousel currentPage="home" contentData={contentData.headerSlidesData}/>

            <div className="mt-6 flex flex-col gap-y-11 pb-6 px-4 md:px-6 lg:px-8 md:gap-y-14">
                {/* Carousel com filmes de ficção */}
                <div>
                    {/* Titulo */}
                    <CarouselDefaultTitle>{tmdbGenres.fiction.title}</CarouselDefaultTitle>
                    {/* Carousel */}
                    <MovieSerieCarousel contentData={contentData.fictionMovies} contentType='movie'/>
                </div>

                <div className="w-full h-px bg-white/20 md:hidden"></div>

                {/* Carousel com filmes/series em alta no momento */}
                <div>
                    {/* Titulo */}
                    <CarouselFeatureTitle>Em alta</CarouselFeatureTitle>
                    <p className="font-medium text-lg text-neutral-400 mb-5 lg:text-xl">
                        Top 20 filmes e séries mais assistidos hoje!
                    </p>
                    {/* Carousel */}
                    <TrendingCarousel contentData={contentData.allTrending}/>
                </div>

                <div className="w-full h-px bg-white/20 md:hidden"></div>

                {/* Carousel com filmes de terror */}
                <div>
                    {/* Titulo */}
                    <CarouselDefaultTitle>{tmdbGenres.horror.title}</CarouselDefaultTitle>
                    {/* <div className='w-full h-0.5 bg-gradient-to-r mb-3 from-orangered to-transparent'/> */}
                    {/* Carousel */}
                    <MovieSerieCarousel contentData={contentData.horrorMovies} contentType='movie'/>
                </div>

                <div className="w-full h-px bg-white/20 md:hidden"></div>

                {/* Carousel com series populares */}
                <div>     
                    <CarouselFeatureTitle>Populares</CarouselFeatureTitle>
                    <p className="font-medium text-lg text-neutral-400 mb-5 lg:text-xl">
                        Confira as séries mais avaliadas.
                    </p>  
                    <PopularSeriesCarousel contentData={contentData.popularSeries}/>
                </div>

                <div className="w-full h-px bg-white/20 md:hidden"></div>

                {/* Carousel com documentarios */}
                <div>
                     {/* Titulo */}
                     <CarouselDefaultTitle>{tmdbGenres.documentary.title}</CarouselDefaultTitle>
                    {/* <div className='w-full h-0.5 bg-gradient-to-r mb-3 from-orangered to-transparent'/> */}
                    {/* Carousel */}
                    <MovieSerieCarousel contentData={contentData.documentaryMovies} contentType='movie'/>
                </div>
            </div>
        </section>
    );
};