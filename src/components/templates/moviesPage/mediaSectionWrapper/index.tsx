'use client';
// hooks
import { useCallback, useState, useEffect } from "react";
import useTmdbFetch from "@/hooks/tmdb";
// traduções
import translations from "@/i18n/translations/movieGenres/translations.json";
// componentes
import GenreSelect from "@/components/molecules/genreSelect";
import MediaSection from "@/components/organisms/mediaSection";
// utilitarios / constantes
import { checkAvailability } from "@/utils/tmdb/checkAvailability";
import { Platform, moviesProviders } from '@/app/[lang]/constants';
// tipos
import { LangCode } from "@/i18n/languages";
import { TmdbMediaProps } from "@/app/[lang]/types";
export type GenreType = { genre: string, title: string };
type ComponentProps = {className?: string, lang: string}

export default function MoviesSection({className, lang}:ComponentProps) {
    const [contentData, setContentData] = useState<TmdbMediaProps[] | null>(null);
    const platforms = Object.keys(moviesProviders);
    const genres = translations[lang as LangCode];
    const [selectedGenre, setSelectedGenre] = useState<GenreType | undefined>();
    const {
        fetchMoviesByGenre,
        fetchReleasedMovies,
        fetchPopularMovies,
        fetchTrendingMovies,
        fetchPlatformContent
    } = useTmdbFetch();

    const getSelectedGenre = useCallback((genre: GenreType) => {
        setSelectedGenre(genre);
    }, []);

    const fetchAndFilter = useCallback(async (fetchFn: () => Promise<any>) => {
        const data = await fetchFn();
        const filtered = await checkAvailability(data);
        const movies = filtered.map(movie => ({...movie, media_type: 'movie'}));
        setContentData(movies);
    }, []);

    const fetchTrendings = useCallback(() => fetchTrendingMovies(lang), [lang]);
    const fetchPopulars = useCallback(() => fetchPopularMovies(lang), [lang]);
    const fetchReleases = useCallback(() => fetchReleasedMovies(1, lang), [lang]);

    useEffect(() => {
        if (!selectedGenre) return;
        const genre = selectedGenre.genre;
        const genreMap: Record<string, () => Promise<any>> = {
            release: fetchReleases,
            popular: fetchPopulars,
            trending: fetchTrendings
        };
        // Plataforma (Netflix, Prime, etc)
        if (platforms.includes(genre)) {
            fetchAndFilter(() => fetchPlatformContent(genre as Platform, 'movie', 1, lang));
            return;
        };
        // release/popular/trending
        if (genreMap[genre]) {
            fetchAndFilter(genreMap[genre]);
            return;
        };
        // Gênero normal
        fetchAndFilter(() => fetchMoviesByGenre(genre, 1, lang));
    }, [selectedGenre]);

    useEffect(() => {
        setSelectedGenre({
            genre: 'trending',
            title: genres.trending
        });
    }, [lang]);

    return (
        <div className={`flex flex-col gap-y-8 page-padding page-max-width relative z-10 ${className}`}>
            { selectedGenre &&
                <GenreSelect
                    onSelectGenre={getSelectedGenre}
                    selectedGenre={selectedGenre}
                    genres={genres}
                    lang={lang}
                />
            }
            <div className="w-full h-px rounded-3xl bg-secondary/10 sm:hidden" />
            {contentData && (
                <MediaSection 
                    data={contentData}
                    mediaType="movie" 
                    lang={lang}
                />
            )}
        </div>
    );
}
