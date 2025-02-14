'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import useFirebase from "@/components/hooks/firebase";

import EmblaCarousel from '@/components/organisms/emblaSlides';
import FavoriteButton from '@/components/molecules/favoriteButton';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { UserDataContext } from '@/components/contexts/authenticationContext';
import { GlobalEventsContext } from "@/components/contexts/globalEventsContext";

import { getReleaseDate } from '@/components/utils/tmdbApiData/releaseDate';

import { tmdbObjProps } from '@/components/contexts/tmdbContext';

import './styles.css';

type CarouselProps = {
    contentData: tmdbObjProps[] | undefined
};

export default function TrendingCarousel( props: CarouselProps ) {

    const router = useRouter(); 
    const { setModalsController } = useContext( GlobalEventsContext );
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
        <div className='trending-slides'>
            <EmblaCarousel navigationType='default'>
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
                                        className="w-full relative h-60 md:h-64 rounded-md cursor-pointer"
                                        onClick={() => router.push(`/player/${item.media_type}/${item.id}`, {scroll: true})}>
                                        <LazyLoadImage
                                            src={`https://image.tmdb.org/t/p/original${item.poster_path ?? item.backdrop_path}`}
                                            alt={`${item.title ?? item.name} movie/serie presentation image`}
                                            width={176}
                                            effect="opacity"
                                            height={'100%'}
                                            placeholderSrc={`https://image.tmdb.org/t/p/w92/${item.poster_path ?? item.backdrop_path}`}
                                            className='w-44 h-full object-cover rounded-md opacity-30'
                                        />
                                    </div>
                                    {/* posição do slide dentro da lista dos conteudos em 'trending' */}
                                    <div className='absolute h-16 w-16 bottom-0 left-0 bg-darkpurple flex items-center justify-center rounded-tr-xl rounded-bl-[5px] z-[2]'>
                                        <span className='text-4xl lg:text-5xl font-bold font-raleway text-white'>
                                            { index + 1 }
                                        </span>
                                    </div>
                                    {/* container com informações do filmes/serie */}
                                    <div className='absolute top-3 left-3 font-raleway z-[3]'>
                                        <span className='text-neutral-400 text-lg'>
                                            { item.media_type === 'movie' ? 'filme' : 'serie' }
                                        </span>
                                        <h4 className='text-xl font-bold'>
                                            { item.name ?? item.title }
                                        </h4>
                                        <span className='text-neutral-400 text-lg'>
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