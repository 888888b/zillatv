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
    const { fetchMoviesByIdList, fetchReleasedMovies } = useTmdbFetch();
    const releasedMovies = await fetchReleasedMovies(1, lang);
    const safeCheck = async (data: any) => await checkAvailability(data ?? []) ?? [];
    const filtered1 = await safeCheck(releasedMovies);
    const idsList = filtered1.map(movie => movie.id);
    const moviesById = await fetchMoviesByIdList(idsList, lang);
    const filtered2 = await safeCheck(moviesById);
    const moviesWithLogo = filtered2.filter(movie => movie.images?.logos.length);
    const carouselMovies = moviesWithLogo.filter((_, index) => index < 8);
    contentData.push(...carouselMovies.map(item => ({ ...item, media_type: 'movie' })).filter((_, index) => index < 6));

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