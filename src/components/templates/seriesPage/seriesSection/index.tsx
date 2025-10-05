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

// utilitarios
import { checkAvailability } from "@/utils/tmdbApiData/availability";
import { tmdbSerieGenres } from "@/app/constants";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
import { Platform, seriesNetworks }  from '@/app/constants';
type ComponentProps = {
    className?: string
};
type GenreType = {
    genre: string;
    title: string;
};

export default function SeriesSection(props: ComponentProps) {

    const [selectedGenre, setSelectedGenre] = useState<GenreType>(tmdbSerieGenres.trending);
    const platforms = Object.keys(seriesNetworks);
    const [
        contentData,
        setContentData
    ] = useState<tmdbObjProps[] | null>(null);

    // funções para buscar series
    const {
        fetchSeriesByGenre,
        fetchReleasedSeries,
        fetchAllTrending,
        fetchPopularSeries,
        fetchPlatformContent
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

    // buscar series por plataforma (netflix, hbo, disney, hulu, prime video)
    const fetchSeriesByPlatform = async (platform: Platform) => {
        const series = await fetchPlatformContent(platform, 'tv');
        const filtered = await checkAvailability(series);
        setContentData([...filtered]);
    };

    useEffect(() => {
        if (selectedGenre.genre === 'release') { fetchLatestSeries(); return };
        if (selectedGenre.genre === 'popular') { fetchPopular(); return };
        if (selectedGenre.genre === 'trending') { fetchTrending(); return };
        if (platforms.includes(selectedGenre.genre)) {
            fetchSeriesByPlatform(selectedGenre.genre as Platform);
            return;
        };
        fetchSeries();
    }, [selectedGenre]);

    return (
        <div className={`flex flex-col gap-y-8 page-padding page-max-width relative z-10 ${props.className}`}>
            {tmdbSerieGenres &&
                <GenreSelect
                    onSelectGenre={updateSelectedGenre}
                    selectedGenre={selectedGenre}
                    genres={tmdbSerieGenres}
                />
            }
            <div className="w-full h-px rounded-3xl bg-secondary/10 sm:hidden" />
            {contentData && <Series data={contentData} mediaType="serie" />}
        </div>
    );
};