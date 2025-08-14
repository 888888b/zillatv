// hooks
import useTmdbFetch from '@/hooks/tmdb';

// componentes
import HeaderCarousel from '@/components/organisms/headerCarousel';
import SeriesSection from './seriesSection';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import { StopLoading } from '@/components/atoms/stopLoading';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

// funções utilitarias
import { checkAvailability } from '@/utils/tmdbApiData/availability';
import { getContentId } from '@/utils/tmdbApiData/id';

export default async function MoviesPage() {

    const contentData: tmdbObjProps[] = [];
    const {
        fetchPopularSeries,
        fetchSeriesByIdList,
        fetchAllTrending
    } = useTmdbFetch();

    const popularSeries = await fetchAllTrending('tv');
    const seriesIdList = await getContentId(popularSeries);
    const series = await fetchSeriesByIdList(seriesIdList);
    const filtered = await checkAvailability(series);
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