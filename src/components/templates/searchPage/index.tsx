// hooks
import useTmdbFetch from '@/components/hooks/tmdb';

// componentes
import SearchResults from '@/components/organisms/moviesSeriesSection';
import ResultsSectionTitle from '@/components/molecules/resultSectionTitle';

// tipos
import { tmdbObjProps } from '@/components/contexts/tmdbContext';

// funções utilitarias
import { checkAvailability } from '@/components/utils/tmdbApiData/availability';

import './styles.css';

type SearchPageProps = {
    keyword: string | undefined
};

export default async function SearchPage( props: SearchPageProps ) {
    const contentData: tmdbObjProps[] = [];
    let contentType: string | undefined;

    const {
        fetchMoviesByGenre,
        fetchMultiTypes
    } = useTmdbFetch();
    const { keyword } = props; 

    if ( keyword ) {
        const content = await fetchMultiTypes( keyword );
        const filtered = await checkAvailability( content ); 
        contentData.push( ...filtered );
        contentType = undefined;
    };

    if ( !keyword ) {
        const movies = await fetchMoviesByGenre('878');    
        const filtered = await checkAvailability( movies );    
        contentData.push( ...filtered );
        contentType = 'movie';
    };

    return contentData.length ? (
        <section className='search-page-container'>
            <div className='my-36 z-[3]'>
                <ResultsSectionTitle contentType={'movie'} searchTerm={keyword}/>
                <SearchResults data={contentData} mediaType={contentType}/>
            </div>
        </section>
    ) : null;
};