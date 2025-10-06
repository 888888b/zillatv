// hooks
import useTmdbFetch from '@/hooks/tmdb';
// componentes
import Header from './header/index';
import SeasonsCarousel from './seasonsWrapper';
import Main from './main/index'
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import SimilarMovies from './moviesCarousel';
import { StopLoading } from '@/components/atoms/stopLoading';
// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';
type PlayerPageProps = {contentId: string; contentType: string};

import './styles.css';

export default async function PlayerPage(props: PlayerPageProps) {

    const { fetchSeriebyId, fetchMovieById } = useTmdbFetch();
    const contentData: tmdbObjProps[] = [];

    if (props.contentType === 'movie') {
        const movie: tmdbObjProps | undefined = await fetchMovieById(props.contentId);
        if (movie) {
            contentData.push(movie);
        };
    };

    if (props.contentType === 'serie' || props.contentType === 'tv') {
        const serie: tmdbObjProps | undefined = await fetchSeriebyId(props.contentId);
        if (serie) {
            contentData.push(serie);
        };
    };

    return contentData ? (
        <>
            <section className='mb-16 player-page'>
                <Header playerData={contentData[0]} />
                <Main mediaData={contentData[0]} mediaType={props.contentType}/>
                {props.contentType === 'movie' ?
                    <SimilarMovies 
                        className='w-full' 
                        movieId={props.contentId} 
                    /> 
                    :
                    <SeasonsCarousel 
                        className='w-full'
                        serieName={contentData[0].name} 
                        serieId={props.contentId} 
                        seasons={contentData[0].seasons} 
                    />
                }
            </section>

            <ScrollToTop/>
            <StopLoading/>
        </>
    ) : null;
};