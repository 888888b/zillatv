// hooks
import useTmdbFetch from '@/hooks/tmdb';

// componentes
import HeaderCarousel from '@/components/organisms/heroCarousel';
import SeriesSection from './seriesSection';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import { StopLoading } from '@/components/atoms/stopLoading';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

// utilitarios
import { checkAvailability } from '@/utils/tmdbApiData/availability';
import { headerSeriesList } from '@/app/constants';

export default async function MoviesPage() {

    const contentData: tmdbObjProps[] = [];
    const {
        fetchSeriesByIdList,
    } = useTmdbFetch();

    const topSeries = await fetchSeriesByIdList(headerSeriesList);
    const filtered = await checkAvailability(topSeries);
    contentData.push(...filtered);

    return contentData ? (
        <>
            <div className='w-full min-h-screen'>
                <HeaderCarousel
                    slidesType='serie'
                    slidesData={contentData}
                    currentPage='series'
                />
                <SeriesSection />
            </div>

            <ScrollToTop />
            <StopLoading/>
        </>
    ) : null;
};