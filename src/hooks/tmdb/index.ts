
import { fetchAllTrending } from "./allTrending";
import { fetchMovieById } from "./movieById";
import { fetchMoviesByIdList } from "./moviesByIdList";
import { fetchPopularMovies } from "./popularMovies";
import { fetchPopularSeries } from "./popularSeries";
import { fetchReleasedMovies } from "./releasedMovies";
import { fetchReleasedSeries } from "./releasedSeries";
import { fetchSeriesByGenre } from "./seriesByGenre";
import { fetchSeriebyId } from "./serieById";
import { fetchSeasons } from "./seasons";
import { fetchSeriesByIdList } from "./seriesByIdList";
import { fetchMoviesByGenre } from "./moviesByGenre";
import { fetchSimilarMovies } from "./similarMovies";
import { fetchMultiTypes } from "./multiTypesPerRequest";
import { fetchTrendingMovies } from "./moviesTrending";
import { fetchPlatformContent } from './moviesSeriesByPlataform';
import { fetchTopRatedSeries } from "./topSeries";
import { fetchMovieClassics } from "./classics";

export default function useTmdbFetch() {
    return { 
        fetchSeriesByGenre, 
        fetchMoviesByGenre, 
        fetchReleasedMovies, 
        fetchPopularSeries, 
        fetchMovieById, 
        fetchSeriebyId, 
        fetchSimilarMovies,
        fetchSeasons,
        fetchPopularMovies,
        fetchReleasedSeries,
        fetchMoviesByIdList,
        fetchSeriesByIdList,
        fetchAllTrending,
        fetchMultiTypes,
        fetchTrendingMovies,
        fetchPlatformContent,
        fetchTopRatedSeries,
        fetchMovieClassics
    };
};