// hooks
import useTmdbFetch from "@/components/hooks/tmdb";

// componentes
import MoviesSeriesCarousel from "@/components/organisms/moviesSeriesCarousel";
import { CarouselDefaultTitle } from "@/components/atoms/carouselDefaultTitle";

// funções utilitarias
import { checkAvailability } from "@/components/utils/tmdbApiData/availability";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

type carouselProps = {
    movieId: string;
};

export default async function FetchCarouselData( props: carouselProps ) {

    const moviesList: tmdbObjProps[] = [];
    const { fetchSimilarMovies } = useTmdbFetch();

    const movies = await fetchSimilarMovies( props.movieId )

    if ( movies ) {
        const filteredMovies = await checkAvailability( movies );
        moviesList.push( ...filteredMovies );
    };

    return moviesList.length ? (
        <div className="mt-6 px-4 md:px-6 lg:px-8">
            <CarouselDefaultTitle>Filmes similares</CarouselDefaultTitle>
            <MoviesSeriesCarousel contentData={moviesList} contentType="movie"/>
        </div>
    ) : null;
};