// hooks
import useTmdbFetch from '@/hooks/tmdb';

// componentes
import HeaderCarousel from '@/components/organisms/headerCarousel';
import MoviesSection from './moviesSection';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

// funções utilitarias
import { checkAvailability } from '@/utils/tmdbApiData/availability';
import { getContentId } from '@/utils/tmdbApiData/id';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';

export default async function MoviesPage() {

    const contentData: tmdbObjProps[]  = [];
    const { 
        fetchPopularMovies,
        fetchMoviesByIdList
    } = useTmdbFetch();

    const popularMovies = await fetchPopularMovies();
    const moviesIdList = await getContentId( popularMovies );
    const movies = await fetchMoviesByIdList( moviesIdList );
    const filtered = await checkAvailability( movies );
    contentData.push( ...filtered );

    return contentData ? (
        <>
            <div className='w-full min-h-screen font-inter'>
                <HeaderCarousel
                    slidesType='movie'
                    slidesData={contentData}
                    currentPage='movies'
                />
                <MoviesSection/>
            </div>

            <ScrollToTop/>
        </>
    ) : null;
};