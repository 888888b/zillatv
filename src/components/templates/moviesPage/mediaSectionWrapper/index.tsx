'use client';
// hooks
import { useCallback, useState, useEffect, useRef } from "react";
import useTmdbFetch from "@/hooks/tmdb";
import { useInfiniteScroll } from "@/hooks/scrollObserver";
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
type ComponentProps = { className?: string, lang: string }
type SectionData = { genre: string, data: TmdbMediaProps[] };

export default function MoviesSection({ className, lang }: ComponentProps) {
    const [sectionData, setSectionData] = useState<SectionData | null>(null);
    const [page, setPage] = useState(3);
    const platforms = Object.keys(moviesProviders);
    const genres = translations[lang as LangCode];
    const [selectedGenre, setSelectedGenre] = useState<GenreType | undefined>();
    const cooldownRef = useRef<boolean>(false);
    const {
        fetchMoviesByGenre,
        fetchReleasedMovies,
        fetchPopularMovies,
        fetchTrendingMovies,
        fetchPlatformContent
    } = useTmdbFetch();

    const observer = useInfiniteScroll(() => {
        if (cooldownRef.current || !sectionData) return;

        cooldownRef.current = true;
        setPage(prev => prev + 1);

        setTimeout(() => {
            cooldownRef.current = false;
        }, 200);
    });

    const getSelectedGenre = useCallback((genre: GenreType) => {
        setSelectedGenre(genre);
        setPage(1);
    }, []);

    const fetchAndFilter = useCallback(
        async (fetchFn: () => Promise<any>) => {
            const data = await fetchFn();
            const filtered = await checkAvailability(data);
            const movies = filtered.map(movie => ({
                ...movie,
                media_type: 'movie'
            }));
            console.log(movies);

            setSectionData(prev => {
                if (!prev || prev.genre !== selectedGenre?.genre) {
                    return { genre: selectedGenre?.genre ?? '', data: movies };
                };

                return { ...prev, data: [...prev.data, ...movies] };
            });
        },
        [selectedGenre]
    );


    const fetchTrendings = useCallback(() => fetchTrendingMovies(lang, page), [lang, page]);
    const fetchPopulars = useCallback(() => fetchPopularMovies(lang, page), [lang, page]);
    const fetchReleases = useCallback(() => fetchReleasedMovies(page, lang), [lang, page]);

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
            fetchAndFilter(() => fetchPlatformContent(genre as Platform, 'movie', page, lang));
            return;
        };
        // release/popular/trending
        if (genreMap[genre]) {
            fetchAndFilter(genreMap[genre]);
            return;
        };
        // Gênero normal
        fetchAndFilter(() => fetchMoviesByGenre(genre, page, lang));
    }, [selectedGenre, page]);

    useEffect(() => {
        setSelectedGenre({
            genre: 'trending',
            title: genres.trending
        });
    }, [lang]);

    return (
        <div className={`flex flex-col gap-y-6 page-padding page-max-width relative z-10 ${className}`}>
            {selectedGenre &&
                <GenreSelect
                    onSelectGenre={getSelectedGenre}
                    selectedGenre={selectedGenre}
                    genres={genres}
                    lang={lang}
                />
            }
            {sectionData && (
                <MediaSection
                    data={sectionData.data}
                    mediaType="movie"
                    lang={lang}
                    className="pb-12"
                />
            )}
            <div ref={observer} className="h-px" />
        </div>
    );
}
