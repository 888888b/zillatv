'use client'
// hooks
import { useState, useRef, useEffect } from 'react';
import { useInfiniteScroll } from '@/hooks/scrollObserver';
import useTmdbFetch from '@/hooks/tmdb';
// componentes
import MediaSection from '@/components/organisms/mediaSection';
// utilitarios
import { checkAvailability } from '@/utils/tmdb/checkAvailability';
import { makeMediaUnique } from '@/utils/tmdb/removeDuplicates';
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { FetchReturn as SectionData } from '@/hooks/tmdb/types';
type ComponentProps = {
    serverData: SectionData
    lang: string,
    keyword?: string,
};

export default function MediaSectionWrapper(props: ComponentProps) {
    const { serverData, lang, keyword } = props;
    const [sectionData, setSectionData] = useState<SectionData | null>(null);
    const [page, setPage] = useState<number>(1);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const cooldownRef = useRef<boolean>(false);
    const { fetchMultiTypes, fetchReleasedMovies } = useTmdbFetch();
    const safeCheck = async (data: any) => await checkAvailability(data ?? []) ?? [];

    const observer = useInfiniteScroll(() => {
        if (cooldownRef.current || !sectionData || page >= sectionData.pages) return;

        cooldownRef.current = true;
        setPage(prev => prev + 1);

        setTimeout(() => {
            cooldownRef.current = false;
        }, 200);
    });

    useEffect(() => {
        if (page === 1) return;
        if (sectionData && page > sectionData.pages) return;
        setIsDataLoading(true);

        const fetch = {
            byKeyword: fetchMultiTypes(keyword ?? '', lang, page),
            released: fetchReleasedMovies(lang, page)
        };

        const addMediaType = (arr: TmdbMediaProps[]): TmdbMediaProps[] => {
            return arr.map(item => ({ ...item, media_type: 'movie' }));
        };

        const fetchMedia = async (): Promise<void> => {
            const media = await (keyword ? fetch.byKeyword : fetch.released);
            const checked = await safeCheck(media?.results);
            const mediaWithType = keyword ? checked : addMediaType(checked);
            setSectionData(prev => {
                if (prev) {
                    return {
                        ...prev,
                        results: makeMediaUnique([...prev.results, ...mediaWithType])
                    }

                } else {
                    return { pages: media?.pages ?? 1, results: mediaWithType };
                };
            });
            setIsDataLoading(false);
        };

        fetchMedia();
    }, [page, lang, keyword]);

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    useEffect(() => {
        setSectionData(serverData);
    }, [serverData]);

    if (!sectionData || !sectionData.results) return null;

    return (
        <div className='w-full'>
            <MediaSection
                data={sectionData.results}
                lang={lang}
                className={isDataLoading ? 'pb-20' : 'pb-12'}
            />
            <div ref={observer} className="h-px" />
            <div className={`duration-200 transition-transform loading loading-spinner loading-xl absolute 
                bottom-6 left-1/2 -translate-x-1/2 ${isDataLoading && page > 1 ? 'transform-[scale(1)]' : 'transform-[scale(0)]'}`} />
        </div>
    );
};