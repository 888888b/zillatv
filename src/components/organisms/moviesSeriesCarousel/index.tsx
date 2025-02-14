'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import useFirebase from "@/components/hooks/firebase";

import EmblaCarousel from '@/components/organisms/emblaSlides';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { FaPlay, FaStar } from "react-icons/fa";

import { UserDataContext } from '@/components/contexts/authenticationContext';
import { GlobalEventsContext } from "@/components/contexts/globalEventsContext";

// Retorna o ano de lançamento do filme/serie formatado
import { getReleaseDate } from '@/components/utils/tmdbApiData/releaseDate';
import { tmdbObjProps } from '@/components/contexts/tmdbContext';

import FavoriteButton from '@/components/molecules/favoriteButton';

import './styles.css';

type ComponentProps = {
    contentData: tmdbObjProps[] | undefined
    contentType: 'movie' | 'serie'
};

export default function MoviesSeriesCarousel( props: ComponentProps ) {
    const router = useRouter(); 
    const { setModalsController } = useContext( GlobalEventsContext );
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
        <div className='carousel-container'>
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
                                
                                <FaPlay className="play-icon" onClick={() => router.push(`/player/${contentType}/${item.id}`, {scroll: true})} />
                                {/* Imagem do conteudo a ser exibido */}
                                <div className="scale-animation" onClick={() => router.push(`/player/${contentType}/${item.id}`, {scroll: true})}>
                                    <LazyLoadImage
                                        src={`https://image.tmdb.org/t/p/original${item.poster_path ?? item.backdrop_path}`}
                                        alt={`${item.title ?? item.name} movie/serie presentation image`}
                                        effect="opacity"
                                        loading='lazy'
                                        placeholderSrc={`https://image.tmdb.org/t/p/w92/${item.poster_path ?? item.backdrop_path}`}
                                        className='image w-44 h-64 object-cover bg-darkpurple rounded-md'
                                    />
                                </div>
                            </div>
    
                            {/* Container de informações sobre o conteudo */}
                            <div className="mt-2 relative pr-2 max-w-44">      
                                {/* Titulo */}
                                <p className="font-raleway font-bold text-[15px] text-white line-clamp-1">{item.title ?? item.name}</p>
                                <div className="flex items-center gap-x-3 font-normal font-noto_sans text-neutral-400">
                                    {/* Data de lançamento */}
                                    <p className="text-[15px]">
                                        {getReleaseDate(item.release_date ?? item.first_air_date)}
                                    </p>
                                    {/* Nota do publico ao conteudo */}
                                    <p className="text-[15px] flex items-center gap-x-1">
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