// hooks
import useTmdbFetch from '@/hooks/tmdb';
// componentes
import HeaderCarousel from '@/components/organisms/heroCarousel';
import MoviesSection from './moviesSection';
import { StopLoading } from '@/components/atoms/stopLoading';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
// funções utilitarias
import { checkAvailability } from '@/utils/tmdbApiData/availability';
import { getContentId } from '@/utils/tmdbApiData/id';
import { formatLangCode } from '@/utils/i18n';

export default async function MoviesPage({lang}:{lang:string}) {
    const contentData: TmdbMediaProps[]  = [];
    const langCode = formatLangCode(lang);
    const { fetchMoviesByIdList, fetchReleasedMovies } = useTmdbFetch();
    const releaseMovies = await fetchReleasedMovies();
    const moviesIdList = await getContentId(releaseMovies);
    const movies = await fetchMoviesByIdList(moviesIdList, langCode);
    const filtered = await checkAvailability(movies);
    contentData.push(...filtered.map(item => ({ ...item, media_type: 'movie' })).filter((_, index) => index < 6));

    return contentData ? (
        <>
            <div className='w-full min-h-screen'>
                <HeaderCarousel
                    slidesData={contentData}
                    currentPage='movies'
                    lang={langCode}
                />
                <MoviesSection 
                    className='mt-12 mb-16 sm:-mt-[calc((56vw*0.25)-100px)]' 
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