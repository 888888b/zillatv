'use client';

// hooks
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import useFirebase from "@/components/hooks/firebase";

// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import FavoriteButton from '@/components/molecules/favoriteButton';

// icones
import { FaPlay, FaStar } from "react-icons/fa";

// contextos
import { UserDataContext } from '@/components/contexts/authenticationContext';
import { GlobalEventsContext } from "@/components/contexts/globalEventsContext";

// funções utilitarias
import { getReleaseDate } from '@/components/utils/tmdbApiData/releaseDate';
import { tmdbObjProps } from '@/components/contexts/tmdbContext';

import { tmdbConfig } from '@/app/constants';

import './styles.css';

type ComponentProps = {
    contentData: tmdbObjProps[] | undefined
    contentType: 'movie' | 'serie'
};

export default function MoviesSeriesCarousel( props: ComponentProps ) {

    const router = useRouter(); 
    const { setModalsController } = useContext( GlobalEventsContext );
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

        setModalsController( prev => ({
            ...prev,
            isRegisterModalActive: !prev.isRegisterModalActive,
            formInstructionsMessage: 'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
        }));    
    };

    return props.contentData ? (             
        <div className='movie-serie-carousel'>
            <EmblaCarousel navigationType='default' dragFree={true}>
                {/* Gerando slides a partir de um array de objetos retornados pela api do TMDB */}
                { props.contentData.map((item) => (   
                    <div className='embla__slide' key={`main-slides-${item.id}`}>  
                        <>
                            <div className='slide-image-container'>
                                {/* Opção para adicionar o filme/serie aos favoritos */}
                                <FavoriteButton
                                    updateFavorites={updateUserFavorites}
                                    buttonId={item.id}
                                    isFavorite={favoriteMovies?.includes(item.id) || favoriteSeries?.includes(item.id) ? true : false}
                                />
                                <div className='play-icon-box'>
                                    <FaPlay 
                                        className="text-richblack text-lg translate-x-px" 
                                        onClick={() => router.push(`/player/${contentType}/${item.id}`, {scroll: true})} 
                                    />
                                </div>
                                {/* Imagem do conteudo a ser exibido */}
                                <div className="scale-animation" onClick={() => router.push(`/player/${contentType}/${item.id}`, {scroll: true})}>
                                    <img
                                        src={item.poster_path ? `${low_resolution_poster}${item.poster_path}` : `${low_resolution_backdrop}${item.backdrop_path}`}
                                        alt={`${item.title ?? item.name} ${contentType} presentation image`}
                                        className="image"
                                    />
                                </div>
                            </div>
    
                            {/* Container de informações sobre o conteudo */}
                            <div className="mt-2 relative pr-2 max-w-[150px] md:max-w-[200px] xl:max-w-56">      
                                {/* Titulo */}
                                <p className="font-raleway font-bold text-[15px] text-white line-clamp-1 xl:text-lg">{item.title ?? item.name}</p>
                                <div className="flex items-center gap-x-3 font-normal font-noto_sans text-neutral-400 text-[15px] xl:text-[17px]">
                                    {/* Data de lançamento */}
                                    <p>
                                        {getReleaseDate(item.release_date ?? item.first_air_date)}
                                    </p>
                                    {/* Nota do publico ao conteudo */}
                                    <p className="flex items-center gap-x-1">
                                        <FaStar className="" />
                                        {(item.vote_average).toFixed(0)}/10
                                    </p>
                                </div>
                            </div>
                        </>
                    </div>
                ))}
            </EmblaCarousel>
        </div>
    ) : null;
};