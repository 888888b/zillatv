'use client';
// hooks
import { useCallback, useState, useEffect } from "react";
import useTmdbFetch from "@/hooks/tmdb";
// traduções
import translations from "@/i18n/translations/serieGenres/translations.json";
// componentes
import GenreSelect from "@/components/molecules/genreSelect";
import MediaSection from "@/components/organisms/mediaSection";
// utilitarios / constantes
import { checkAvailability } from "@/utils/tmdb/checkAvailability";
import { Platform, seriesNetworks } from '@/app/[lang]/constants';
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { LangCode } from "@/i18n/languages";
export type GenreType = { genre: string, title: string };
type ComponentProps = {className?: string, lang: string}

export default function SeriesSection({className, lang}:ComponentProps) {
    const [contentData, setContentData] = useState<TmdbMediaProps[] | null>(null);
    const platforms = Object.keys(seriesNetworks);
    const genres = translations[lang as LangCode];
    const [selectedGenre, setSelectedGenre] = useState<GenreType | undefined>();
    const {
        fetchSeriesByGenre,
        fetchReleasedSeries,
        fetchPopularSeries,
        fetchAllTrending,
        fetchPlatformContent
    } = useTmdbFetch();

    const getSelectedGenre = useCallback((genre: GenreType) => {
        setSelectedGenre(genre);
    }, []);

    const fetchAndFilter = useCallback(async (fetchFn: () => Promise<any>) => {
        const data = await fetchFn();
        const filtered = await checkAvailability(data);
        const series = filtered.map(movie => ({...movie, media_type: 'serie'}));
        setContentData(series);
    }, []);

    const fetchTrendings = useCallback(() => fetchAllTrending('tv', lang), [lang]);
    const fetchPopulars = useCallback(() => fetchPopularSeries(lang), [lang]);
    const fetchReleases = useCallback(() => fetchReleasedSeries(1, lang), [lang]);

    useEffect(() => {
        if (!selectedGenre) return;
        const genre = selectedGenre.genre;
        const genreMap: Record<string, () => Promise<any>> = {
            release: fetchReleases,
            popular: fetchPopulars,
            trending: fetchTrendings
        };
        // Plataforma
        if (platforms.includes(genre)) {
            fetchAndFilter(() => fetchPlatformContent(genre as Platform, 'tv', 1, lang));
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
                    lang={lang}
                />
            )}
            <div className="w-full h-px rounded-3xl bg-secondary/10 sm:hidden" />
            {contentData && 
                <MediaSection 
                    data={contentData} 
                    mediaType="tv" 
                    lang={lang}
                />
            }
        </div>
    );
}
