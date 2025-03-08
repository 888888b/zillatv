'use client';

// hooks
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import useFirebase from '@/components/hooks/firebase';

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

// icones
import { FaPlay, FaStar } from "react-icons/fa";

// contextos
import { UserDataContext } from '@/contexts/authenticationContext';
import { GlobalEventsContext } from '@/contexts/globalEventsContext';

// funções utilitarias
import { getReleaseDate } from '@/components/utils/tmdbApiData/releaseDate';

// elementos
import FavoriteButton from '@/components/molecules/favoriteButton';

import { tmdbConfig } from '@/app/constants';

import './styles.css';

type ComponentProps = {
    data: tmdbObjProps[];
    mediaType?: string
};

export default function MoviesSeriesSection( props: ComponentProps ) {

    const { data, mediaType } = props;
    const router = useRouter();
    const {
        favoriteMovies,
        favoriteSeries,
        isLoggedIn
    } = useContext( UserDataContext );
    
    const { 
        addUserFavoritesToDb, 
        deleteUserFavoritesOnDb 
    } = useFirebase();

    const { dispatch } = useContext( GlobalEventsContext );

    const nextNavigate = ( mediaType: string, id: string ) => {
        router.push(`player/${mediaType}/${id}`, { 
            scroll: true 
        });
    };

    // Define se o filme/serie e favorito ou nao, caso seja, salva no banco de dados
    const updateUserFavorites = async ( contentId: string, mediaType: string ) => {
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

    const getSlideType = ( mediaType: string ) => {
        if ( mediaType === 'movie' ) {
            return 'Filme';
        };

        return 'Série'
    };

    return data.length ? (
        <>
            <div className='movie-serie-section-container font-inter'>
                { data.map(( content, index ) => (
                    content.media_type !== 'person' ? (
                        <div key={`${content.id}-${index}`}>
                            <div className='card'>
                                {/* Opção para adicionar o filme/serie aos favoritos */}
                                <FavoriteButton
                                    updateFavorites={updateUserFavorites}
                                    buttonId={content.id}
                                    isFavorite={favoriteMovies?.includes(content.id) || favoriteSeries?.includes(content.id) ? true : false}
                                    mediaType={mediaType ?? content.media_type}
                                />

                                <div 
                                    className='play-icon-box'
                                    onClick={() => {
                                    nextNavigate( mediaType ?? content.media_type, content.id )
                                    }} >
                                    <FaPlay className="text-richblack text-lg translate-x-px"/>
                                </div>

                                <div 
                                    onClick={() => {
                                    nextNavigate( mediaType ?? content.media_type, content.id )
                                    }}
                                    className='image-box'>
                                    {/* Imagem do conteudo */}
                                    <img
                                        src={content.poster_path ? `${tmdbConfig.low_resolution_poster}${content.poster_path}` : `${tmdbConfig.low_resolution_backdrop}${content.backdrop_path}`}
                                        alt={`${content.title ?? content.name} serie/movie presentation image`}
                                        className="image"
                                        loading='lazy'
                                    />
                                </div>
                            </div>

                            {/* Container de informações sobre o conteudo */}
                            <div className="mt-2 relative">
                                {/* Titulo */}
                                <p className="font-bold text-base text-white line-clamp-1 xl:text-[17px]">
                                    { content.title ?? content.name }
                                </p>

                                <div className="flex items-center gap-x-3 font-normal text-neutral-400 text-[15px] xl:text-[17px]">
                                    {/* Data de lançamento */}
                                    <p>
                                        {getReleaseDate( content.release_date ?? content.first_air_date )}
                                    </p>

                                    {/* Nota do publico ao conteudo */}
                                    <p className="flex items-center gap-x-1">
                                        <FaStar className=""/> 
                                        {( content.vote_average).toFixed(0 )}/10
                                    </p>
                                </div>
                                
                                {/* tipo do slide. filme/serie */}
                                <p className='text-primary text-[15px] xl:text-base'>
                                    {getSlideType(  mediaType ?? content.media_type )}
                                </p>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </>
    ) : null;
};