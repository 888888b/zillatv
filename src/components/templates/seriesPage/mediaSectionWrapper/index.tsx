'use client';
// hooks
import { useCallback, useState, useEffect, useRef } from "react";
import useTmdbFetch from "@/hooks/tmdb";
import { useInfiniteScroll } from "@/hooks/scrollObserver";
// traduções
import translations from "@/i18n/translations/serieGenres/translations.json";
// componentes
import GenreSelect from "@/components/molecules/genreSelect";
import MediaSection from "@/components/organisms/mediaSection";
// utilitarios / constantes
import { checkAvailability } from "@/utils/tmdb/checkAvailability";
import { Platform, seriesNetworks } from '@/app/[lang]/constants';
import { makeMediaUnique } from "@/utils/tmdb/removeDuplicates";
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { LangCode } from "@/i18n/languages";
export type GenreType = { genre: string, title: string };
type ComponentProps = { className?: string, lang: string }
type SectionData = { genre: string, data: TmdbMediaProps[] };

export default function SeriesSection({ className, lang }: ComponentProps) {
    const [sectionData, setSectionData] = useState<SectionData | null>(null);
    const [page, setPage] = useState(1);
    // const [isDataLoading, setIsDataLoading] = useState(false);
    const platforms = Object.keys(seriesNetworks);
    const genres = translations[lang as LangCode];
    const [selectedGenre, setSelectedGenre] = useState<GenreType | undefined>();
    const cooldownRef = useRef<boolean>(false);
    const {
        fetchSeriesByGenre,
        fetchReleasedSeries,
        fetchPopularSeries,
        fetchAllTrending,
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
            const series = filtered.map(serie => ({
                ...serie,
                media_type: 'serie'
            }));

            setSectionData(prev => {
                if (!prev || prev.genre !== selectedGenre?.genre) {
                    return { genre: selectedGenre?.genre ?? '', data: makeMediaUnique(series) };
                };

                return { ...prev, data: makeMediaUnique([...prev.data, ...series]) };
            });
            // setIsDataLoading(false);
        },
        [selectedGenre])

    const fetchTrendings = useCallback(() => fetchAllTrending('tv', lang, page), [lang, page]);
    const fetchPopulars = useCallback(() => fetchPopularSeries(lang, page), [lang, page]);
    const fetchReleases = useCallback(() => fetchReleasedSeries(lang, page), [lang, page]);

    useEffect(() => {
        if (!selectedGenre) return;
        const genre = selectedGenre.genre;
        const genreMap: Record<string, () => Promise<any>> = {
            release: fetchReleases,
            popular: fetchPopulars,
            trending: fetchTrendings
        };
        // setIsDataLoading(true);
        // Plataforma (Netflix, Prime, etc)
        if (platforms.includes(genre)) {
            fetchAndFilter(() => fetchPlatformContent(genre as Platform, 'tv', page, lang));
            return;
        };
        // release/popular/trending
        if (genreMap[genre]) {
            fetchAndFilter(genreMap[genre]);
            return;
        };
        // Gênero normal
        fetchAndFilter(() => fetchSeriesByGenre(genre, lang, page));
    }, [selectedGenre, page]);

    useEffect(() => {
        setSelectedGenre({
            genre: 'trending',
            title: genres.trending
        });
    }, [lang]);

    return (
        <div className={`flex flex-col gap-y-6 page-padding page-max-width relative z-10 ${className}`}>
            {selectedGenre && (
                <GenreSelect
                    onSelectGenre={getSelectedGenre}
                    selectedGenre={selectedGenre}
                    genres={genres}
                    lang={lang}
                />
            )}
            {sectionData &&
                <MediaSection
                    data={sectionData.data}
                    lang={lang}
                    className="pb-12"
                />
            }
            <div ref={observer} className="h-px" />
            {/* <div className={`transition-[transform_0.3s_ease-out] loading loading-spinner loading-xl absolute 
                bottom-6 left-1/2 -translate-x-1/2 ${isDataLoading ? 'scale-100' : 'scale-0'}`}/> */}
        </div>
    );
}
