// hooks
import useTmdbFetch from '@/hooks/tmdb';
import useWatchmode from '@/hooks/watchmode';
// componentes
import Header from './header/index';
import EpisodesCarousel from './footer/episodeCarouselWrapper';
import Main from './main/index';
import SimilarsCarousel from './footer/similarCarouselWrapper';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import { StopLoading } from '@/components/atoms/stopLoading';
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
type ComponentProps = {
    mediaId: string;
    mediaType: 'serie' | 'movie' | 'tv';
    lang: string;
};
// utilitarios
import { formatLangCode } from '@/utils/i18n';

import './styles.css';

export default async function PlayerPage({ mediaType, mediaId, lang }: ComponentProps) {
    const { fetchSeriebyId, fetchMovieById } = useTmdbFetch();
    const { searchInfoByTmdbId, searchStreamingsById } = useWatchmode();
    const langCode = formatLangCode(lang);

    // Busca TMDB (filme/série)
    const media: TmdbMediaProps | undefined =
        mediaType === 'movie'
            ? await fetchMovieById(mediaId, langCode)
            : await fetchSeriebyId(mediaId, langCode);

    if (!media) {
        return <div className="page-max-width py-10 text-center text-gray-400">Conteúdo não encontrado</div>;
    };

    // Busca streaming info
    const titleInfo = await searchInfoByTmdbId({
        tmdbId: mediaId,
        idType: mediaType === 'movie' ? 'tmdb_movie_id' : 'tmdb_tv_id'
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
            <section className="mb-12 player-page">
                <Header 
                    media={media} 
                    lang={langCode}
                    type={mediaType}
                />
                <Main
                    mediaData={media}
                    mediaType={mediaType}
                    streamingsData={streamingsInfo}
                    lang={langCode}
                />
                {mediaType === 'movie' ? (
                    <SimilarsCarousel 
                        className="w-full mt-16" 
                        movieId={mediaId}
                        lang={langCode} 
                    />
                ) : (
                    <EpisodesCarousel
                        className="w-full mt-16"
                        serieName={media.name}
                        serieId={mediaId}
                        seasons={media.seasons}
                        lang={langCode}
                    />
                )}
            </section>
            <ScrollToTop />
            <StopLoading />
        </>
    );
}
