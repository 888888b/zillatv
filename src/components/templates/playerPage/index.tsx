// hooks
import useTmdbFetch from '@/hooks/tmdb';

// componentes
import Header from './header/index';
import SeasonsCarousel from './seasonsCarousel';
import Main from './main/index'
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import SimilarMovies from './moviesCarousel';

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
            <section className='mb-16'>
                <Header playerData={contentData[0]} />
                <Main mediaData={contentData[0]} mediaType={props.contentType} />
                {props.contentType === 'movie' ?
                    <SimilarMovies 
                        className='w-full mt-[60px] px-5 sm:px-10 lg:px-[70px]' 
                        movieId={props.contentId} 
                    /> 
                    :
                    <SeasonsCarousel 
                        className='w-full mt-[60px] px-5 sm:px-10 lg:px-[70px]'
                        serieName={contentData[0].name} 
                        serieId={props.contentId} 
                        seasons={contentData[0].seasons} 
                    />
                }
            </section>

            <ScrollToTop/>
        </>
    ) : null;
};