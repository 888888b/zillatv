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
import { formatLangCode } from '@/utils/i18n';

export default async function MoviesPage({lang}:{lang:string}) {
    const heroCarouselData: TmdbMediaProps[] = [];
    const language = formatLangCode(lang);
    const { fetchSeriesByIdList, fetchAllTrending } = useTmdbFetch();
    // BUSCA / FILTRA / PREPARA DADOS DO CARROSSEL HERO
    const trendingSeries = await fetchAllTrending('tv', lang);
    const safeCheck = async (data: any) => await checkAvailability(data ?? []) ?? [];
    const seriesIdsList = (await safeCheck(trendingSeries?.results)).map(series => series.id).slice(0, 9);
    const seriesByIdList = await fetchSeriesByIdList(seriesIdsList, lang);
    const seriesWithLogo = (await safeCheck(seriesByIdList)).filter(series => series.images?.logos.length).slice(0, 6);
    heroCarouselData.push(...seriesWithLogo.map(item => ({ ...item, media_type: 'serie' })));

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