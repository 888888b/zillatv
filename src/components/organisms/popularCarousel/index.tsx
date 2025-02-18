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
    
    const router = useRouter(); 
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
        <div className='popular-slides'>
            <EmblaCarousel navigationType='default'>
                {/* Gerando slides a partir de um array de objetos retornados pela api do TMDB */}
                {props.contentData.map((item, index) => (
                    <div key={`main-slides-${item.id}`} className='embla__slide'>
                        {
                            item.poster_path || item.backdrop_path ? (
                                <div className="slide-container">
                                    {/* Opção para adicionar o filme/serie aos favoritos */}
                                    <FavoriteButton 
                                        updateFavorites={updateUserFavorites}
                                        buttonId={item.id}
                                        mediaType={'serie'}
                                        isFavorite={favoriteMovies?.includes(item.id) || favoriteSeries?.includes(item.id) ? true : false}
                                    />
            
                                    {/* Imagem do conteudo a ser exibido */}
                                    <div className="w-[376px] max-[calc(100%-32px)] h-60 md:h-64 bg-darkpurple rounded-md">
                                        <img
                                            src={item.poster_path ? `${low_resolution_poster}${item.poster_path}` : `${low_resolution_backdrop}${item.backdrop_path}`}
                                            alt={`${item.title ?? item.name} serie presentation image`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* overlay */}
                                    <div className='overlay'></div>

                                    {/* posição do slide dentro da lista dos conteudos em 'trending' */}
                                    <div className='absolute h-16 w-16 bottom-0 left-0 -translate-x-0.5 bg-darkpurple flex items-center justify-center rounded-tr-xl z-[3]'>
                                        <span className='text-4xl lg:text-5xl font-bold text-white'>
                                            { index + 1 }
                                        </span>
                                    </div>

                                    {/* container com informações do filmes/serie */}
                                    <div className='absolute top-3 left-3 pr-3 z-[2]'>
                                        <span className='text-neutral-400 text-lg lg:text-xl'>
                                            { item.number_of_seasons ?
                                                `Temporadas (${item.number_of_seasons})` : null
                                            }
                                        </span>
                                        <h4 className='text-lg font-bold line-clamp-2 md:text-xl md:line-clamp-none xl:text-2xl'>
                                            { item.name }
                                        </h4>
                                        <span className='text-neutral-400 text-lg lg:text-xl'>
                                            {getReleaseDate( item.first_air_date )}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => router.push(`player/serie/${item.id}`, { scroll: true })}
                                        className='btn absolute bottom-2 right-4 w-[calc(100%-96px)] h-[54px] rounded-lg bg-orangered md:bg-orange-950 md:hover:bg-orangered z-[4] text-lg font-medium duration-200 outline-none border-none text-white md:text-neutral-400 md:hover:text-white'
                                        style={{animationTimingFunction: 'ease'}}
                                        >
                                        <FaPlay className='text-xl'/> Ir para a série
                                    </button>
                                </div>
                            ) : null
                        }
                    </div>
                ))}
            </EmblaCarousel>
        </div>
    ) : null;
};