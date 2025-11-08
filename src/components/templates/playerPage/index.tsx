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
import { TmdbMediaProps } from '@/app/types';

type ComponentProps = {
    contentId: string;
    contentType: 'serie' | 'movie' | 'tv'
};

import './styles.css';

export default async function PlayerPage({ contentType, contentId }: ComponentProps) {
    const { fetchSeriebyId, fetchMovieById } = useTmdbFetch();
    const { searchInfoByTmdbId, searchStreamingsById } = useWatchmode();

    // Busca TMDB (filme/série)
    const mediaData: TmdbMediaProps | undefined =
        contentType === 'movie'
            ? await fetchMovieById(contentId)
            : await fetchSeriebyId(contentId);

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
        const services = await searchStreamingsById(titleInfo.id);
        streamingsInfo = services?.map(streaming => ({
            ...streaming,
            domain: streaming.web_url.split(/[/?]/)[2] // extrai domínio
        }));
    };

    return (
        <>
            <section className="mb-16 player-page">
                <Header playerData={mediaData} />
                <Main
                    mediaData={mediaData}
                    mediaType={contentType}
                    streamingsData={streamingsInfo}
                />
                {contentType === 'movie' ? (
                    <SimilarsCarousel className="w-full mt-16" movieId={contentId} />
                ) : (
                    <EpisodesCarousel
                        className="w-full mt-16"
                        serieName={mediaData.name}
                        serieId={contentId}
                        seasons={mediaData.seasons}
                    />
                )}
            </section>
            <ScrollToTop />
            <StopLoading />
        </>
    );
}
