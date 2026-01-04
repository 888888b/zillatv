// hooks
import useTmdbFetch from '@/hooks/tmdb';
// componentes
import HeaderCarousel from '@/components/organisms/headerCarousel';
import MediaSectionWrapper from './mediaSectionWrapper';
import { StopLoading } from '@/components/atoms/stopLoading';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
// funções utilitarias
import { checkAvailability } from '@/utils/tmdb/checkAvailability';
import { formatLangCode } from '@/utils/i18n';

export default async function MoviesPage({lang}:{lang:string}) {
    const contentData: TmdbMediaProps[]  = [];
    const langCode = formatLangCode(lang);
    const { fetchMoviesByIdList, fetchTrendingMovies } = useTmdbFetch();
    // BUSCA / FILTRA / PREPARA DADOS DO CARROSSEL HERO
    const trendingMovies = await fetchTrendingMovies(lang);
    const safeCheck = async (data: any) => await checkAvailability(data ?? []) ?? [];
    const moviesIdsList = (await safeCheck(trendingMovies?.results)).map(movie => movie.id).slice(0, 9);
    const moviesByIdList = await fetchMoviesByIdList(moviesIdsList, lang);
    const moviesWithLogo = (await safeCheck(moviesByIdList)).filter(movie => movie.images?.logos.length).slice(0, 6);
    contentData.push(...moviesWithLogo.map(item => ({ ...item, media_type: 'movie' })));

    return contentData ? (
        <>
            <div className='w-full min-h-screen'>
                <HeaderCarousel
                    slidesData={contentData}
                    currentPage='movies'
                    lang={langCode}
                />
                <MediaSectionWrapper 
                    className='mt-12 sm:-mt-[calc((56vw*0.25)-100px)]' 
                    lang={langCode}
                />
            </div>
            {/* força rolagem para o topo da pagina apos o carregamento */}
            <ScrollToTop/>
            {/* fecha o loading da pagina apos o carregamento */}
            <StopLoading/>
        </>
    ) : null;
};