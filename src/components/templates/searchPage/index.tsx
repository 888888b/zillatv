// hooks
import useTmdbFetch from '@/hooks/tmdb';

// componentes
import SearchResults from '@/components/organisms/moviesSeriesSection';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import { StopLoading } from '@/components/atoms/stopLoading';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

// funções utilitarias
import { checkAvailability } from '@/utils/tmdbApiData/availability';

import './styles.css';

type SearchPageProps = {
    keyword: string | undefined
};

export default async function SearchPage(props: SearchPageProps) {
    const contentData: tmdbObjProps[] = [];
    let contentType: string | undefined;

    const {
        fetchMoviesByGenre,
        fetchMultiTypes
    } = useTmdbFetch();
    const { keyword } = props;

    if (keyword) {
        const content = await fetchMultiTypes(keyword);
        const filtered = await checkAvailability(content);
        contentData.push(...filtered);
        contentType = undefined;
    } else {
        const movies = await fetchMoviesByGenre('878');
        const filtered = await checkAvailability(movies);
        contentData.push(...filtered);
        contentType = 'movie';
    };

    return contentData ? (
        <>
            <section className='search-page-container page-max-width page-padding'>
                <div className='overlay' />
                <div className='z-[2] mt-[clamp(6rem,9vw,7.5rem)] flex flex-col items-start gap-y-5'>
                    <SearchResults data={contentData} mediaType={contentType}/>
                </div>
            </section>

            <ScrollToTop/>
            <StopLoading/>
        </>
    ) : null;
};