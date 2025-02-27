'use client';

// hooks
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import useFirebase from "@/components/hooks/firebase";

// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import FavoriteButton from '@/components/molecules/favoriteButton';

// icones
import { FaPlay } from "react-icons/fa";

// contextos
import { UserDataContext } from '@/components/contexts/authenticationContext';
import { GlobalEventsContext } from "@/components/contexts/globalEventsContext";

// tipos
import { tmdbObjProps } from '@/components/contexts/tmdbContext';

// funções utilitarias
import { getReleaseDate } from '@/components/utils/tmdbApiData/releaseDate';

import { tmdbConfig } from '@/app/constants';

import './styles.css';

type CarouselProps = {
    contentData: tmdbObjProps[] | undefined;
};

export default function PopularSeriesCarousel( props: CarouselProps ) {
    
    const { push } = useRouter(); 
    const { setModalsController } = useContext( GlobalEventsContext );
    const { 
        low_resolution_poster, 
        low_resolution_backdrop 
    } = tmdbConfig;

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

        setModalsController( prev => ({
            ...prev,
            isRegisterModalActive: !prev.isRegisterModalActive,
            formInstructionsMessage: 'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
        }));    
    };

    return props.contentData ? (             
        <div className='popular-slides font-inter'>
            <EmblaCarousel navigationType='default'>
                {/* Gerando slides a partir de um array de objetos retornados pela api do TMDB */}
                {props.contentData.map( serie => (
                    <div key={`main-slides-${serie.id}`} className='embla__slide'>
                        {
                            serie.poster_path || serie.backdrop_path ? (
                                <div className="w-[400px] max-w-[calc(100vw-32px)] overflow-hidden relative">
                                    <div className='slide-image-container'>
                                        {/* Opção para adicionar o filme/serie aos favoritos */}
                                        <FavoriteButton
                                            updateFavorites={updateUserFavorites}
                                            buttonId={serie.id}
                                            mediaType={'serie'}
                                            isFavorite={favoriteMovies?.includes(serie.id) || favoriteSeries?.includes(serie.id) ? true : false}
                                        />

                                        <div className='play-icon-box'>
                                            <FaPlay 
                                                className="text-richblack text-lg translate-x-px" 
                                                onClick={() => push(`/player/serie/${serie.id}`, {scroll: true})} 
                                            />
                                        </div>

                                        {/* Imagem do conteudo a ser exibido */}
                                        <div 
                                            onClick={() => push(`/player/serie/${serie.id}`)}
                                            className="w-full aspect-[1/0.5] bg-darkpurple rounded-[4px] overflow-hidden">
                                            <img
                                                src={
                                                    serie.backdrop_path ? 
                                                    `${low_resolution_backdrop}${serie.backdrop_path}` : 
                                                    `${low_resolution_poster}${serie.poster_path}`
                                                }
                                                alt={`${serie.title ?? serie.name} serie presentation image`}
                                                className="image"
                                            />
                                        </div>
                                    </div>

                                    {/* container com informações do filmes/serie */}
                                    <div className='mt-2'>
                                        {/* titulo */}
                                        <h3 
                                            className="font-bold text-base text-white line-clamp-1 md:text-[17px]">
                                            { serie.name }
                                        </h3>

                                        <div className='flex items-center gap-x-3 font-normal text-neutral-400 text-base md:text-[17px]'>
                                            {/* numero de temporadas */}
                                            { serie.number_of_seasons && (
                                                <p>
                                                    { serie.number_of_seasons } Temporada(s)
                                                </p>
                                            )}
                                            
                                            {/* Nota do publico ao conteudo */}
                                            <p className="flex items-center gap-x-1 text-primary">
                                                {(serie.vote_average).toFixed(0)}/10
                                            </p>

                                            {/* data de lançamento */}
                                            <p>
                                                {getReleaseDate(serie.release_date ?? serie.first_air_date)}
                                            </p>
                                        </div>
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