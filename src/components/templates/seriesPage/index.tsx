// hooks
import useTmdbFetch from '@/hooks/tmdb';
// componentes
import HeaderCarousel from '@/components/organisms/heroCarousel';
import SeriesSection from './seriesSection';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import { StopLoading } from '@/components/atoms/stopLoading';
// tipos
import { TmdbMediaProps } from '@/app/types';
// utilitarios
import { checkAvailability } from '@/utils/tmdbApiData/availability';
import { getContentId } from '@/utils/tmdbApiData/id';

export default async function MoviesPage() {
    const headerSlides: TmdbMediaProps[] = [];
    const { fetchSeriesByIdList, fetchAllTrending } = useTmdbFetch();
    const trendingSeries = await fetchAllTrending('tv');
    const seriesIdsList = await getContentId( trendingSeries );
    const seriesByIdList = await fetchSeriesByIdList(seriesIdsList);
    const filtered = await checkAvailability(seriesByIdList);
    headerSlides.push(...filtered.map(item => ({ ...item, media_type: 'serie' })).filter((_, index) => index < 6));

    return headerSlides && (
        <>
            <div className='w-full min-h-screen'>
                <HeaderCarousel
                    slidesData={headerSlides}
                    currentPage='series'
                />
                <SeriesSection className='mt-12 mb-16 sm:-mt-[clamp(0px,4.5vw,46px)]'/>
            </div>
            {/* força rolagem para o topo da pagina apos o carregamento */}
            <ScrollToTop />
            {/* fecha o loading da pagina apos o carregamento */}
            <StopLoading />
        </>
    );
};