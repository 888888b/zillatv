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
    const headerSlides: TmdbMediaProps[] = [];
    const langCode = formatLangCode(lang);
    const { fetchSeriesByIdList, fetchAllTrending } = useTmdbFetch();
    const trendingSeries = await fetchAllTrending('tv', lang);
    const seriesIdsList = await getContentId( trendingSeries );
    const seriesByIdList = await fetchSeriesByIdList(seriesIdsList, lang);
    const filtered = await checkAvailability(seriesByIdList);
    headerSlides.push(...filtered.map(item => ({ ...item, media_type: 'serie' })).filter((_, index) => index < 6));

    return headerSlides && (
        <>
            <div className='w-full min-h-screen'>
                <HeaderCarousel
                    slidesData={headerSlides}
                    currentPage='series'
                    lang={langCode}
                />
                <MediaSectionWrapper 
                    className='mt-12 sm:-mt-[calc((56vw*0.25)-100px)]'
                    lang={langCode}
                />
            </div>
            {/* força rolagem para o topo da pagina apos o carregamento */}
            <ScrollToTop />
            {/* fecha o loading da pagina apos o carregamento */}
            <StopLoading />
        </>
    );
};