// hooks
import useTmdbFetch from '@/hooks/tmdb';
import useWatchmode, { StreamingsInfo } from '@/hooks/watchmode';
// componentes
import Header from './header/index';
import SeasonsCarousel from './footer/episodesCarouselWrapper';
import Main from './main/index'
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import SimilarMovies from './footer/moviesCarousel';
import { StopLoading } from '@/components/atoms/stopLoading';
// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';
type ComponentProps = { contentId: string; contentType: 'serie' | 'movie' | 'tv' };

import './styles.css';

export default async function PlayerPage(props: ComponentProps) {
    const { fetchSeriebyId, fetchMovieById } = useTmdbFetch();
    const { searchInfoByTmdbId, searchStreamingsById } = useWatchmode();
    const contentData: tmdbObjProps[] = [];
    const { contentType, contentId } = props;
    let streamingsInfo: StreamingsInfo[] | undefined = undefined;

    if (contentType === 'movie') {
        const movie: tmdbObjProps | undefined = await fetchMovieById(contentId);
        if (movie) contentData.push(movie);
    } else {
        const serie: tmdbObjProps | undefined = await fetchSeriebyId(contentId);
        if (serie) contentData.push(serie);
    };
    const titleInfo = await searchInfoByTmdbId({
        tmdbId: contentId,
        idType: contentType === 'movie' ? 'tmdb_movie_id' : 'tmdb_tv_id'
    });
    if (titleInfo) {
        streamingsInfo = await searchStreamingsById(titleInfo.id);
        if (streamingsInfo) {
            const updatedStreamingsInfo = streamingsInfo.map(streaming => ({
                ...streaming,
                domain: streaming.web_url.split(/[/?]/)[2]
            }));
            streamingsInfo = [...updatedStreamingsInfo];
        };
    };

    return contentData && (
        <>
            <section className='mb-16 player-page'>
                <Header playerData={contentData[0]} />
                <Main
                    mediaData={contentData[0]}
                    mediaType={contentType}
                    streamingsData={streamingsInfo}
                />
                {contentType === 'movie' ?
                    <SimilarMovies className='w-full mt-16' movieId={contentId} />
                    :
                    <SeasonsCarousel
                        className='w-full mt-16'
                        serieName={contentData[0].name}
                        serieId={contentId}
                        seasons={contentData[0].seasons}
                    />
                }
            </section>
            {/* volta ao top sempre que a pagina carrega */}
            <ScrollToTop />
            {/* encerra a animação de loading */}
            <StopLoading />
        </>
    );
};