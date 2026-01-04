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
import { makeMediaUnique } from "@/utils/tmdb/removeDuplicates";
import { Platform, moviesProviders } from '@/app/[lang]/constants';
// tipos
import { LangCode } from "@/i18n/languages";
import { FetchReturn } from "@/hooks/tmdb/types";
import { TmdbMediaProps } from "@/app/[lang]/types";
export type GenreType = { genre: string, title: string };
type ComponentProps = { className?: string, lang: string }
type SectionData = { genre: string, data: TmdbMediaProps[], pages: number };

export default function MoviesSection({ className, lang }: ComponentProps) {
    const [sectionData, setSectionData] = useState<SectionData | null>(null);
    const [page, setPage] = useState(1);
    const [isDataLoading, setIsDataLoading] = useState(false);
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
        if (cooldownRef.current || !sectionData || page >= sectionData.pages) return;

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
        async (fetchFn: () => Promise<FetchReturn | undefined>) => {
            const data = await fetchFn();
            if (!data) return;
            const checked = await checkAvailability(data.results ?? []) ?? [];
            const movies = checked.map(movie => ({
                ...movie,
                media_type: 'movie'
            }));

            setSectionData(prev => {
                if (!prev || prev.genre !== selectedGenre?.genre) {
                    return { genre: selectedGenre?.genre ?? '', data: makeMediaUnique(movies), pages: data.pages };
                };

                return { ...prev, data: makeMediaUnique([...prev.data, ...movies]) };
            });
            setIsDataLoading(false);
        },
        [selectedGenre]
    );


    const fetchTrendings = useCallback(() => fetchTrendingMovies(lang, page), [lang, page]);
    const fetchPopulars = useCallback(() => fetchPopularMovies(lang, page), [lang, page]);
    const fetchReleases = useCallback(() => fetchReleasedMovies(lang, page), [lang, page]);

    useEffect(() => {
        if (!selectedGenre) return;
        if (selectedGenre.genre === sectionData?.genre && page > sectionData.pages) return;
        
        const genre = selectedGenre.genre;
        setIsDataLoading(true);

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
        fetchAndFilter(() => fetchMoviesByGenre(genre, lang, page));
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
                    lang={lang}
                    className={isDataLoading ? 'pb-15' : 'pb-12'}
                />
            )}
            <div ref={observer} className="h-px" />
            <div className={`duration-200 transition-transform loading loading-spinner loading-xl absolute 
                bottom-6 left-1/2 -translate-x-1/2 ${isDataLoading && page > 1 ? 'transform-[scale(1)]' : 'transform-[scale(0)]'}`}/>
        </div>
    );
}
