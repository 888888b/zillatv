'use client';

// hooks
import {
    useCallback,
    useState,
    useEffect
} from "react";
import useTmdbFetch from "@/hooks/tmdb";

// componentes
import CategorySelect from "@/components/molecules/categorySelect";
import MoviesSeriesSection from "@/components/organisms/moviesSeriesSection";

// funções utilitarias
import { checkAvailability } from "@/utils/tmdbApiData/availability";

import { tmdbGenres } from "@/app/constants";
import { tmdbObjProps } from "@/contexts/tmdbContext";

type ComponentProps = {
    className?: string
};

export default function MoviesSection(props: ComponentProps) {

    const [selectedGenre, setSelectedGenre] = useState('16');
    const [
        contentData,
        setContentData
    ] = useState<tmdbObjProps[] | null>(null);

    // funções para buscar filmes
    const {
        fetchMoviesByGenre,
        fetchReleasedMovies,
        fetchPopularMovies,
        fetchTrendingMovies
    } = useTmdbFetch();

    const getSelectedGenre = useCallback((newGenre: string) => {
        setSelectedGenre(newGenre);
    }, [ setSelectedGenre ]);

    // buscar filmes por genero
    const fetchMovies = async () => {
        const movies = await fetchMoviesByGenre(selectedGenre);
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

    useEffect(() => {
        if (selectedGenre === 'release') {fetchLatestMovies(); return};
        if (selectedGenre === 'popular') {fetchPopular(); return};
        if (selectedGenre === 'trending') {fetchTrending(); return};
        fetchMovies();
    }, [selectedGenre]);

    return (
        <div 
            className={`flex flex-col gap-y-10 px-5 sm:px-10 lg:px-[70px] mt-20 mb-12 sm:mb-0 sm:mt-0 sm:-translate-y-14 relative z-10 ${props.className}`}>
            <CategorySelect
            onSelectGenre={getSelectedGenre}
            genresList={tmdbGenres}
            />
            <div className="w-full h-px rounded-3xl bg-secondary/10"/>
            {contentData && <MoviesSeriesSection data={contentData} mediaType="movie" />}
        </div>
    );
};