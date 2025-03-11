import SimilarMovies from './footer/moviesCarousel';

// Hook personalizado com funções para busca de conteudo no TMDB
import useTmdbFetch from '@/components/hooks/tmdb';

// Interface de tipos para objetos retornados pela api do TMDB
import { tmdbObjProps } from '../../../contexts/tmdbContext';
import dynamic from 'next/dynamic';

type PlayerPageProps = {
    contentId: string;
    contentType: string;
};

import Header from './header/index';
import SeasonsCarousel from './footer/seasonsCarousel';
import Main from './main/index'

export default async function PlayerPage( props: PlayerPageProps ) {

    const { fetchSeriebyId, fetchMovieById } = useTmdbFetch();
    const contentData: tmdbObjProps[] = [];

    if ( props.contentType === 'movie' ) {
        const movie: tmdbObjProps | undefined = await fetchMovieById(props.contentId);
        if ( movie ) {
            contentData.push( movie );
        };
    };

    if ( props.contentType === 'serie' || props.contentType === 'tv' ) {
        const serie: tmdbObjProps | undefined = await fetchSeriebyId(props.contentId);
        if ( serie ) {
            contentData.push( serie );
        };
    };

    return contentData.length ? (
        <section className='min-h-screen mb-6'>
            <Header playerData={contentData[0]}/>

            <Main contentData={contentData[0]} contentType={ props.contentType }/>
            
            { props.contentType === 'movie' ? 
                <SimilarMovies movieId={props.contentId}/> :
                <SeasonsCarousel serieName={contentData[0].name} serieId={props.contentId} seasons={contentData[0].seasons}/>    
            }
        </section>
    ) : null;
};