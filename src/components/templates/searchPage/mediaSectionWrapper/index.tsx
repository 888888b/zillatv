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
type ComponentProps = {
    serverData: TmdbMediaProps[];
    lang: string;
    keyword?: string;
};
type SectionData = TmdbMediaProps[];

export default function MediaSectionWrapper(props: ComponentProps) {
    const { serverData, lang, keyword } = props;
    const [sectionData, setSectionData] = useState<SectionData>([]);
    const [page, setPage] = useState<number>(1);
    const cooldownRef = useRef<boolean>(false);
    const { fetchMultiTypes, fetchReleasedMovies } = useTmdbFetch();

    const observer = useInfiniteScroll(() => {
        if (cooldownRef.current || sectionData.length === 0) return;

        cooldownRef.current = true;
        setPage(prev => prev + 1);

        setTimeout(() => {
            cooldownRef.current = false;
        }, 200);
    });

    useEffect(() => {
        if (page === 1) return;

        const fetch = {
            byKeyword: fetchMultiTypes(keyword ?? '', lang, page),
            released: fetchReleasedMovies(page, lang)
        };

        const addMediaType = (arr: TmdbMediaProps[]): TmdbMediaProps[] => {
            return arr.map(item => ({...item, media_type: 'movie'}));
        };

        const fetchMedia = async (): Promise<void> => {
            const media = await (keyword ? fetch.byKeyword : fetch.released);
            const checked = await checkAvailability(media) ?? [];
            const mediaWithType = keyword ? checked : addMediaType(checked);
            setSectionData(prev => makeMediaUnique([...prev, ...mediaWithType]));
        };

        fetchMedia();
    }, [page, lang, keyword]);

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    useEffect(() => {
        setSectionData(serverData);
    }, [serverData]);

    return sectionData.length ? (
        <div className='w-full'>
            <MediaSection
                data={sectionData}
                lang={lang}
                className='pb-12'
            />
            <div ref={observer} className="h-px" />
        </div>
    ) : null;
};