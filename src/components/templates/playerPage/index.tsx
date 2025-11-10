// hooks
import useTmdbFetch from '@/hooks/tmdb';
import useWatchmode from '@/hooks/watchmode';
// componentes
import Header from './header/index';
import EpisodesCarousel from './footer/episodesCarouselWrapper';
import Main from './main/index';
import SimilarsCarousel from './footer/similarsCarouselWrapper';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import { StopLoading } from '@/components/atoms/stopLoading';
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
type ComponentProps = {
    contentId: string;
    contentType: 'serie' | 'movie' | 'tv';
    lang: string;
};
// utilitarios
import { formatLangCode } from '@/utils/i18n';

import './styles.css';

export default async function PlayerPage({ contentType, contentId, lang }: ComponentProps) {
    const { fetchSeriebyId, fetchMovieById } = useTmdbFetch();
    const { searchInfoByTmdbId, searchStreamingsById } = useWatchmode();
    const langCode = formatLangCode(lang);

    // Busca TMDB (filme/série)
    const mediaData: TmdbMediaProps | undefined =
        contentType === 'movie'
            ? await fetchMovieById(contentId, langCode)
            : await fetchSeriebyId(contentId, langCode);

    if (!mediaData) {
        return <div className="page-max-width py-10 text-center text-gray-400">Conteúdo não encontrado</div>;
    };

    // Busca streaming info
    const titleInfo = await searchInfoByTmdbId({
        tmdbId: contentId,
        idType: contentType === 'movie' ? 'tmdb_movie_id' : 'tmdb_tv_id'
    });

    let streamingsInfo;

    if (titleInfo) {
        const services = await searchStreamingsById(titleInfo.id, langCode);
        streamingsInfo = services?.map(streaming => ({
            ...streaming,
            domain: streaming.web_url.split(/[/?]/)[2] // extrai domínio
        }));
    };

    return (
        <>
            <section className="mb-16 player-page">
                <Header playerData={mediaData} lang={langCode}/>
                <Main
                    mediaData={mediaData}
                    mediaType={contentType}
                    streamingsData={streamingsInfo}
                    lang={langCode}
                />
                {contentType === 'movie' ? (
                    <SimilarsCarousel 
                        className="w-full mt-16" 
                        movieId={contentId}
                        lang={langCode} 
                    />
                ) : (
                    <EpisodesCarousel
                        className="w-full mt-16"
                        serieName={mediaData.name}
                        serieId={contentId}
                        seasons={mediaData.seasons}
                        lang={langCode}
                    />
                )}
            </section>
            <ScrollToTop />
            <StopLoading />
        </>
    );
}
