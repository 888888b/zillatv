'use client';
// hooks
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import useFirebase from "@/hooks/firebase";

// elementos
import EmblaCarousel from '@/components/organisms/emblaSlides';
import FavoriteButton from '@/components/molecules/favoriteButton';

// contextos
import { UserDataContext } from '@/contexts/authenticationContext';
import { GlobalEventsContext } from "@/contexts/globalEventsContext";

// funções utilitarias
import { getReleaseDate } from '@/utils/tmdbApiData/releaseDate';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

import './styles.css';

type CarouselProps = {
    contentData: tmdbObjProps[] | undefined
};

export default function TrendingCarousel( props: CarouselProps ) {

    const posterUrl = 'https://image.tmdb.org/t/p/w500/';
    const backdropUrl = 'https://image.tmdb.org/t/p/w780/'
    const router = useRouter(); 
    const { dispatch } = useContext( GlobalEventsContext );
    const { 
        addUserFavoritesToDb, 
        deleteUserFavoritesOnDb 
    } = useFirebase();

    const {
        favoriteMovies,
        favoriteSeries,
        isLoggedIn
    } = useContext( UserDataContext );

    // Define se o filme/serie e favorito ou nao, caso seja, salva no banco de dados
    const updateUserFavorites = ( contentId: string, mediaType: string  ) => {
        if ( isLoggedIn ) {
            if (!favoriteMovies?.includes(contentId) && !favoriteSeries?.includes(contentId)) {
                addUserFavoritesToDb( contentId, mediaType );
                return;
            };
            
            deleteUserFavoritesOnDb( contentId, mediaType );
            return;
        }; 
        
        dispatch({type: 'IS_REGISTER_MODAL_ACTIVE', payload: true});
            
        dispatch({type: 'SET_ERROR', payload: {
            type: 'formInstructions',
            message: 'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
        }});   
    };

    return props.contentData ? (             
        <div className='trending-slides'>
            <EmblaCarousel navigationType='default' dragFree={true}>
                {/* Gerando slides a partir de um array de objetos retornados pela api do TMDB */}
                { props.contentData.map((item, index) => (
                    <div
                        key={`main-slides-${item.id}`}
                        className='embla__slide'>
                        {
                            item.poster_path || item.backdrop_path ? (
                                <div
                                    className="slide-container">
                                    {/* Opção para adicionar o filme/serie aos favoritos */}
                                    <FavoriteButton 
                                        updateFavorites={updateUserFavorites}
                                        buttonId={item.id}
                                        isFavorite={favoriteMovies?.includes(item.id) || favoriteSeries?.includes(item.id) ? true : false}
                                    />
                                    {/* Imagem do conteudo a ser exibido */}
                                    <div
                                        onClick={() => router.push(`/player/${item.media_type}/${item.id}`, {scroll: true})}>
                                        <img
                                            src={item.poster_path ? `${posterUrl}${item.poster_path}` : `${backdropUrl}${item.backdrop_path}`}
                                            alt={`${item.title ?? item.name} ${item.media_type} presentation image`}
                                            className="image"
                                        />
                                    </div>
                                    {/* posição do slide dentro da lista dos conteudos em 'trending' */}
                                    <div className='absolute h-16 w-16 bottom-0 left-0 bg-darkpurple flex items-center justify-center rounded-tr-xl rounded-bl-[5px] z-[2] md:w-20 md:h-20 xl:w-24 xl:h-24'>
                                        <span className='text-4xl md:text-5xl font-bold font-raleway text-white'>
                                            { index + 1 }
                                        </span>
                                    </div>
                                    {/* container com informações do filmes/serie */}
                                    <div className='absolute top-3 left-3 font-raleway z-[3]'>
                                        <span className='text-neutral-400 text-lg lg:text-xl'>
                                            { item.media_type === 'movie' ? 'filme' : 'serie' }
                                        </span>
                                        <h4 className='text-lg font-bold line-clamp-2 md:text-xl md:line-clamp-none xl:text-2xl'>
                                            { item.name ?? item.title }
                                        </h4>
                                        <span className='text-primary text-lg lg:text-xl'>
                                            {getReleaseDate( item.first_air_date ?? item.release_date )}
                                        </span>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                ))}
            </EmblaCarousel>
        </div>
    ) : null;
};