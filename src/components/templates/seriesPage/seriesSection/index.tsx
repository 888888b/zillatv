'use client';
// hooks
import { useCallback, useState, useEffect } from "react";
import useTmdbFetch from "@/hooks/tmdb";
import useLanguage from "@/hooks/lang";
// traduções
import translations from "@/i18n/translations/serieGenres/translations.json";
// componentes
import GenreSelect from "@/components/molecules/genreSelect";
import MoviesSeriesSection from "@/components/organisms/moviesSeriesSection";
// utilitarios / constantes
import { checkAvailability } from "@/utils/tmdbApiData/availability";
import { Platform, seriesNetworks } from '@/app/constants';
// tipos
import { TmdbMediaProps } from "@/app/types";

export type GenreType = { genre: string, title: string };

export default function SeriesSection({ className }: { className?: string }) {
    const [contentData, setContentData] = useState<TmdbMediaProps[] | null>(null);
    const platforms = Object.keys(seriesNetworks);
    const lang = useLanguage().language.code;
    const genres = translations[lang];
    const [selectedGenre, setSelectedGenre] = useState<GenreType | undefined>();
    const {
        fetchSeriesByGenre,
        fetchReleasedSeries,
        fetchPopularSeries,
        fetchAllTrending,
        fetchPlatformContent
    } = useTmdbFetch();

    const fetchTrendingSeries = useCallback(() => fetchAllTrending('tv'), []);

    const getSelectedGenre = useCallback((genre: GenreType) => {
        setSelectedGenre(genre);
    }, []);

    const fetchAndFilter = useCallback(async (fetchFn: () => Promise<any>) => {
        const data = await fetchFn();
        const filtered = await checkAvailability(data);
        setContentData(filtered);
    }, []);

    useEffect(() => {
        if (!selectedGenre) return;
        const genre = selectedGenre.genre;
        const genreMap: Record<string, () => Promise<any>> = {
            release: fetchReleasedSeries,
            popular: fetchPopularSeries,
            trending: fetchTrendingSeries
        };
        // Plataforma
        if (platforms.includes(genre)) {
            fetchAndFilter(() => fetchPlatformContent(genre as Platform, 'tv'));
            return;
        };
        // release/popular/trending
        if (genreMap[genre]) {
            fetchAndFilter(genreMap[genre]);
            return;
        };
        // Gênero normal
        fetchAndFilter(() => fetchSeriesByGenre(genre));
    }, [selectedGenre]);

    useEffect(() => {
        setSelectedGenre({
            genre: 'trending',
            title: genres.trending
        });
    }, [lang]);

    return (
        <div className={`flex flex-col gap-y-8 page-padding page-max-width relative z-10 ${className}`}>
            {selectedGenre && (
                <GenreSelect
                    onSelectGenre={getSelectedGenre}
                    selectedGenre={selectedGenre}
                    genres={genres}
                />
            )}
            <div className="w-full h-px rounded-3xl bg-secondary/10 sm:hidden" />
            {contentData && <MoviesSeriesSection data={contentData} mediaType="tv" />}
        </div>
    );
}
