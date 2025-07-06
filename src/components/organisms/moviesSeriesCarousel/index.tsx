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
import { UserDataContext } from '@/contexts/authenticationContext';
import { GlobalEventsContext } from "@/contexts/globalEventsContext";

// funções utilitarias
import { tmdbObjProps } from '@/contexts/tmdbContext';

import { tmdbConfig } from '@/app/constants';

import './styles.css';

type ComponentProps = {
    contentData: tmdbObjProps[] | undefined
    contentType: 'movie' | 'serie'
};

export default function MoviesSeriesCarousel( props: ComponentProps ) {

    const router = useRouter(); 
    const { dispatch } = useContext( GlobalEventsContext );
    const {
        low_resolution_poster,
        low_resolution_backdrop
    } = tmdbConfig;

    const { contentType } = props;
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
    const updateUserFavorites = async ( contentId: string ) => {
        if ( isLoggedIn ) {
            if (!favoriteMovies?.includes(contentId) && !favoriteSeries?.includes(contentId)) {
                addUserFavoritesToDb( contentId, contentType );
                return;
            };
            
            deleteUserFavoritesOnDb( contentId, contentType );
            return;
        }; 

        dispatch({type: 'IS_REGISTER_MODAL_ACTIVE', payload: true});
            
        dispatch({type: 'SET_ERROR', payload: {
            type: 'formInstructions',
            message: 'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
        }});
    };

    return props.contentData ? (             
        <div className='movie-serie-carousel'>
            <EmblaCarousel navigationType='default' dragFree={true}>
                {/* Gerando slides a partir de um array de objetos retornados pela api do TMDB */}
                { props.contentData.map((content) => (  
                    content.poster_path || content.backdrop_path ? (
                        <div className='embla__slide' key={`main-slides-${content.id}`}>  
                            <>
                                <div className='slide-image-container'>
                                    {/* Opção para adicionar o filme/serie aos favoritos */}
                                    <FavoriteButton
                                        updateFavorites={updateUserFavorites}
                                        buttonId={content.id}
                                        isFavorite={favoriteMovies?.includes(content.id) || favoriteSeries?.includes(content.id) ? true : false}
                                    />
                                    
                                    {/* botao de play */}
                                    <div 
                                        className='play-icon-box' 
                                        onClick={() => router.push(`/player/${contentType}/${content.id}`, {scroll: true})} >
                                        <FaPlay className="text-primary-content text-lg translate-x-px" />
                                    </div>

                                    {/* Imagem do conteudo a ser exibido */}
                                    <div 
                                        className="scale-animation" 
                                        onClick={() => router.push(`/player/${contentType}/${content.id}`, {scroll: true})}>
                                        <img
                                            src={
                                                content.poster_path ? 
                                                `${low_resolution_poster}${content.poster_path}` : 
                                                `${low_resolution_backdrop}${content.backdrop_path}`
                                            }
                                            alt={`
                                                ${content.title ?? content.name} ${contentType} presentation image`
                                            }
                                            className="image min-w-full min-h-full object-cover"
                                        />
                                    </div>
                                </div>
        
                                {/* Container de informações sobre o conteudo */}
                                <div className="mt-[10px] relative pr-2 max-w-[140px] md:max-w-[200px] xl:max-w-56 lg:hidden">      
                                    {/* Titulo */}
                                    <h3 
                                        className="font-medium text-base text-secondary line-clamp-1">
                                        {content.title ?? content.name}
                                    </h3>

                                    {/* <div 
                                        className="flex items-center gap-x-3 font-normal text-neutral-400 text-[15px] md:text-base">
                                        Data de lançamento
                                        <p>
                                            {getReleaseDate(content.release_date ?? content.first_air_date)}
                                        </p>
                                        Nota do publico ao conteudo
                                        <p className="flex items-center gap-x-1 text-primary">
                                            {(content.vote_average).toFixed(0)}/10
                                        </p>
                                    </div>  */}
                                </div>
                            </>
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div>
    ) : null;
};