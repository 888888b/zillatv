// hooks
import useTmdbFetch from "@/hooks/tmdb";

// componentes
import MoviesSeriesCarousel from "@/components/organisms/moviesSeriesCarousel";
import { CarouselTitle } from "@/components/atoms/carouselTitle";

// funções utilitarias
import { checkAvailability } from "@/utils/tmdbApiData/availability";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

type carouselProps = {
    movieId: string;
    className?: string;
};

export default async function FetchCarouselData(props: carouselProps) {

    const moviesList: tmdbObjProps[] = [];
    const { movieId, className } = props;
    const { fetchSimilarMovies } = useTmdbFetch();

    const movies = await fetchSimilarMovies(movieId)

    if (movies) {
        const filteredMovies = await checkAvailability(movies);
        moviesList.push(...filteredMovies);
    };

    return moviesList ? (
        <div className={`flex flex-col gap-y-5 ${className}`}>
            <CarouselTitle>Filmes similares</CarouselTitle>
            <MoviesSeriesCarousel slidesData={moviesList} slidesType="movie" />
        </div>
    ) : null;
};