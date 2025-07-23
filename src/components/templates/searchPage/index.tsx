// hooks
import useTmdbFetch from '@/components/hooks/tmdb';

// componentes
import SearchResults from '@/components/organisms/moviesSeriesSection';
import ResultsSectionTitle from '@/components/molecules/resultSectionTitle';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

// funções utilitarias
import { checkAvailability } from '@/components/utils/tmdbApiData/availability';
import { ScrollToTop } from '@/components/utils/globalActions/scrollToTop';

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
            <section className='search-page-container px-5 sm:px-10 lg:px-[70px]'>
                <div className='overlay' />
                <div className='z-[2] mt-44'>
                    <ResultsSectionTitle mediaType={'movie'}>{keyword}</ResultsSectionTitle>
                    <div className='w-full h-px bg-secondary/10 rounded-3xl my-10' ></div >
                    <SearchResults data={contentData} mediaType={contentType} />
                </div>
            </section>

            <ScrollToTop/>
        </>
    ) : null;
};