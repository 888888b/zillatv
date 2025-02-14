import useTmdbFetch from "@/components/hooks/tmdb";

import HeaderCarousel from "@/components/organisms/headerCarousel";
import TrendingCarousel from "@/components/organisms/trendingCarousel";
import PopularSeriesCarousel from "@/components/organisms/popularCarousel";

import MovieSerieCarousel from "@/components/organisms/moviesSeriesCarousel";
import { CarouselDefaultTitle } from "@/components/atoms/carouselDefaultTitle";
import { CarouselFeatureTitle } from "@/components/atoms/carouselFeatureTitle";

import { tmdbObjProps } from "@/components/contexts/tmdbContext";

import { getContentId } from "@/components/utils/tmdbApiData/id";
import { checkAvailability } from "@/components/utils/tmdbApiData/availability";

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

    // Informações de Generos de filmes no TMDB como, numero do genero, titulo para o genero e nome do genero
    const tmdbGenres = {
        release: [ 'release', 'Em Destaque: Os Filmes Mais Recentes'], 
        horror: [ '27', 'Horror em exibição'],
        action: [ '28', 'Adrenalina em cartaz'],
        comedy: [ '35', 'Comedia: Diversão com a família'],
        cartoon: [ '16', 'Diversão para Crianças'],
        romance: [ '10749', 'Histórias de Amor à Moda Antiga'],
        documentary: [ '99', 'Documentando o mundo'],
        war: [ '10752', 'Guerra: Uma Batalha pela Sobrevivência'],
        fiction: [ '878', 'Universos paralelos: Ficção'],
        adventure: [ '12', 'Desbravando o Desconhecido: Aventuras'],
    };

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
        <section className="min-h-screen">
            <HeaderCarousel currentPage="home" contentData={contentData.headerSlidesData}/>

            <div className="mt-4 flex flex-col gap-y-[40px] pb-6 px-4 md:px-6 lg:px-8">
                {/* Carousel com filmes de ficção */}
                <div>
                    {/* Titulo */}
                    <CarouselDefaultTitle>{tmdbGenres.fiction[1]}</CarouselDefaultTitle>
                    <div className='w-full h-0.5 bg-gradient-to-r mb-3 from-orangered to-transparent'/>
                    {/* Carousel */}
                    <MovieSerieCarousel contentData={contentData.fictionMovies} contentType='movie'/>
                </div>

                {/* Carousel com filmes/series em alta no momento */}
                <div>
                    {/* Titulo */}
                    <CarouselFeatureTitle>Em alta</CarouselFeatureTitle>
                    <p className="font-normal text-[17px] text-neutral-400 mb-5 lg:text-lg">
                        Top 20 filmes e séries mais assistidos hoje!
                    </p>
                    {/* Carousel */}
                    <TrendingCarousel contentData={contentData.allTrending}/>
                </div>

                {/* Carousel com filmes de terror */}
                <div>
                    {/* Titulo */}
                    <CarouselDefaultTitle>{tmdbGenres.horror[1]}</CarouselDefaultTitle>
                    <div className='w-full h-0.5 bg-gradient-to-r mb-3 from-orangered to-transparent'/>
                    {/* Carousel */}
                    <MovieSerieCarousel contentData={contentData.horrorMovies} contentType='movie'/>
                </div>

                {/* Carousel com series populares */}
                <div>     
                    <CarouselFeatureTitle>Séries populares</CarouselFeatureTitle>
                    <p className="font-normal text-[17px] text-neutral-400 mb-5 lg:text-lg">
                        Confira as séries mais avaliadas.
                    </p>  
                    <PopularSeriesCarousel contentData={contentData.popularSeries}/>
                </div>

                {/* Carousel com documentarios */}
                <div>
                     {/* Titulo */}
                     <CarouselDefaultTitle>{tmdbGenres.documentary[1]}</CarouselDefaultTitle>
                    <div className='w-full h-0.5 bg-gradient-to-r mb-3 from-orangered to-transparent'/>
                    {/* Carousel */}
                    <MovieSerieCarousel contentData={contentData.documentaryMovies} contentType='movie'/>
                </div>
            </div>
        </section>
    );
};