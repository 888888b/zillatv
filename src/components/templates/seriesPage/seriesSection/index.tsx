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
import Series from "@/components/organisms/moviesSeriesSection";

// funções utilitarias
import { checkAvailability } from "@/utils/tmdbApiData/availability";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

type ComponentProps = {
    className?: string
};

import { tmdbSerieGenres } from "@/app/constants";

type GenreType = {
    genre: string;
    title: string;
};

export default function SeriesSection(props: ComponentProps) {

    const [selectedGenre, setSelectedGenre] = useState<GenreType>(tmdbSerieGenres.trending);
    const [
        contentData,
        setContentData
    ] = useState<tmdbObjProps[] | null>(null);

    // funções para buscar series
    const {
        fetchSeriesByGenre,
        fetchReleasedSeries,
        fetchAllTrending,
        fetchPopularSeries
    } = useTmdbFetch();

    const updateSelectedGenre = useCallback((genre: GenreType) => {
        setSelectedGenre(genre);
    }, [setSelectedGenre]);

    // buscar series por genero
    const fetchSeries = async () => {
        const series = await fetchSeriesByGenre(selectedGenre.genre);
        const filtered = await checkAvailability(series);
        setContentData([...filtered]);
    };

    // buscar as series mais recentes
    const fetchLatestSeries = async () => {
        const series = await fetchReleasedSeries();
        const filtered = await checkAvailability(series);
        setContentData([...filtered]);
    };

    // buscar series em alta
    const fetchTrending = async () => {
        const series = await fetchAllTrending('tv');
        const filtered = await checkAvailability(series);
        setContentData([...filtered]);
    };

    // buscar series populares
    const fetchPopular = async () => {
        const series = await fetchPopularSeries();
        const filtered = await checkAvailability(series);
        setContentData([...filtered]);
    };

    useEffect(() => {
        if (selectedGenre.genre === 'release') {fetchLatestSeries(); return};
        if (selectedGenre.genre === 'popular') {fetchPopular(); return};
        if (selectedGenre.genre === 'trending') {fetchTrending(); return};
        fetchSeries();
    }, [selectedGenre]);

    return (
        <div className={`flex flex-col gap-y-10 px-5 sm:px-10 lg:px-[70px] mt-10 mb-12 sm:mb-0 sm:mt-0 sm:-translate-y-14 relative z-10 ${props.className}`}>
            <GenreSelect 
                onSelectGenre={updateSelectedGenre} 
                selectedGenre={selectedGenre}
                genres={tmdbSerieGenres}
            />
            {contentData ? <Series data={contentData} mediaType="serie" /> : null}
        </div>
    );
};