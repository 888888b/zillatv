// hooks
import useTmdbFetch from '@/hooks/tmdb';
// componentes
import HeaderCarousel from '@/components/organisms/headerCarousel';
import MediaSectionWrapper from './mediaSectionWrapper';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import { StopLoading } from '@/components/atoms/stopLoading';
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
// utilitarios
import { checkAvailability } from '@/utils/tmdb/checkAvailability';
import { getContentId } from '@/utils/tmdb/getIdList';
import { formatLangCode } from '@/utils/i18n';

export default async function MoviesPage({lang}:{lang:string}) {
    const heroCarouselData: TmdbMediaProps[] = [];
    const language = formatLangCode(lang);
    const { fetchSeriesByIdList, fetchAllTrending } = useTmdbFetch();
    const trendingSeries = await fetchAllTrending('tv', lang);
    const safeCheck = async (data: any) => await checkAvailability(data ?? []) ?? [];
    const seriesIdsList = await getContentId(trendingSeries);
    const seriesByIdList = await fetchSeriesByIdList(seriesIdsList, lang);
    const filtered = await safeCheck(seriesByIdList);
    heroCarouselData.push(...filtered.map(item => ({ ...item, media_type: 'serie' })).filter((_, index) => index < 6));

    return heroCarouselData && (
        <>
            <div className='w-full min-h-screen'>
                <HeaderCarousel
                    slidesData={heroCarouselData}
                    currentPage='series'
                    lang={language}
                />
                <MediaSectionWrapper 
                    className='mt-12 sm:-mt-[calc((56vw*0.25)-100px)]'
                    lang={language}
                />
            </div>
            {/* força rolagem para o topo da pagina apos o carregamento */}
            <ScrollToTop />
            {/* fecha o loading da pagina apos o carregamento */}
            <StopLoading />
        </>
    );
};