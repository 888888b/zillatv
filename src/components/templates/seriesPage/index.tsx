// hooks
import useTmdbFetch from '@/components/hooks/tmdb';

// componentes
import HeaderCarousel from '@/components/organisms/headerCarousel';
import SeriesSection from './seriesSection';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

// funções utilitarias
import { checkAvailability } from '@/components/utils/tmdbApiData/availability';
import { getContentId } from '@/components/utils/tmdbApiData/id';
import { ScrollToTop } from '@/components/utils/globalActions/scrollToTop';

export default async function MoviesPage() {

    const contentData: tmdbObjProps[]  = [];
    const { 
        fetchPopularSeries,
        fetchSeriesByIdList
    } = useTmdbFetch();

    const popularSeries = await fetchPopularSeries();
    const seriesIdList = await getContentId( popularSeries );
    const series = await fetchSeriesByIdList( seriesIdList );
    const filtered = await checkAvailability( series );
    contentData.push( ...filtered );

    return contentData ? (
       <>
           <div className='w-full min-h-screen font-inter'>
                <HeaderCarousel
                    slidesType='serie'
                    slidesData={contentData}
                    currentPage='series'
                />
                <SeriesSection/>
            </div>

            <ScrollToTop/>
       </>
    ) : null;
};