'use client';

// hooks
import {
    useCallback,
    useState,
    useEffect
} from "react";
import useTmdbFetch from "@/hooks/tmdb";

// componentes
import GenreSelect from "@/components/molecules/genreSelect";
import MoviesSeriesSection from "@/components/organisms/moviesSeriesSection";

// utilitarios
import { checkAvailability } from "@/utils/tmdbApiData/availability";
import { tmdbGenres } from "@/app/constants";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
import { Platform, moviesProviders } from '@/app/constants';
type ComponentProps = {
    className?: string
};
export type GenreType = {
    genre: string;
    title: string;
};

export default function MoviesSection(props: ComponentProps) {

    const [selectedGenre, setSelectedGenre] = useState<GenreType>(tmdbGenres.trending);
    const platforms = Object.keys(moviesProviders);
    const [
        contentData,
        setContentData
    ] = useState<tmdbObjProps[] | null>(null);

    // funções para buscar filmes
    const {
        fetchMoviesByGenre,
        fetchReleasedMovies,
        fetchPopularMovies,
        fetchTrendingMovies,
        fetchPlatformContent
    } = useTmdbFetch();

    const getSelectedGenre = useCallback((genre: GenreType) => {
        setSelectedGenre(genre);
    }, [setSelectedGenre]);

    // buscar filmes por genero
    const fetchMovies = async () => {
        const movies = await fetchMoviesByGenre(selectedGenre.genre);
        const filtered = await checkAvailability(movies);
        setContentData([...filtered]);
    };

    // buscar os filmes mais recentes
    const fetchLatestMovies = async () => {
        const movies = await fetchReleasedMovies();
        const filtered = await checkAvailability(movies);
        setContentData([...filtered]);
    };

    // buscar os filmes populares
    const fetchPopular = async () => {
        const movies = await fetchPopularMovies();
        const filtered = await checkAvailability(movies);
        setContentData([...filtered]);
    };

    // buscar os filmes em alta
    const fetchTrending = async () => {
        const movies = await fetchTrendingMovies();
        const filtered = await checkAvailability(movies);
        setContentData([...filtered]);
    };

    // buscar filmes por plataforma (netflix, hbo, disney, hulu, prime video)
    const fetchMoviesByPlatform = async (platform: Platform) => {
        const movies = await fetchPlatformContent(platform, 'movie');
        const filtered = await checkAvailability(movies);
        console.log(filtered);
        setContentData([...filtered]);
    };

    useEffect(() => {
        if (selectedGenre.genre === 'release') { fetchLatestMovies(); return };
        if (selectedGenre.genre === 'popular') { fetchPopular(); return };
        if (selectedGenre.genre === 'trending') { fetchTrending(); return };
        if (platforms.includes(selectedGenre.genre)) {
            fetchMoviesByPlatform(selectedGenre.genre as Platform);
            return;
        };
        fetchMovies();
    }, [selectedGenre]);
  
    return (
        <div
            className={`flex flex-col gap-y-8 px-5 sm:px-10 lg:px-16 mt-8 mb-16 sm:-mt-[84px] relative z-10 ${props.className}`}>
            {tmdbGenres &&
                <GenreSelect
                    onSelectGenre={getSelectedGenre}
                    selectedGenre={selectedGenre}
                    genres={tmdbGenres}
                />
            }
            <div className="w-full h-px rounded-3xl bg-secondary/10 sm:hidden" />
            {contentData && <MoviesSeriesSection data={contentData} mediaType="movie" />}
        </div>
    );
};