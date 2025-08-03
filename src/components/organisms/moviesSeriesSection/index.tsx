'use client';

// hooks
import { useRouter } from 'next/navigation';
import { useContext, useState, useCallback } from 'react';
import useFirebase from '@/hooks/firebase';

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

// icones
import { FaPlay, FaStar } from "react-icons/fa";

// contextos
import { UserDataContext } from '@/contexts/authenticationContext';
import { GlobalEventsContext } from '@/contexts/globalEventsContext';

// componentes
import FavoriteButton from '@/components/molecules/favoriteButton';

import { tmdbConfig } from '@/app/constants';

import './styles.css';

type ComponentProps = {
    data: tmdbObjProps[];
    mediaType?: string
};

export default function MoviesSeriesSection(props: ComponentProps) {

    const { data, mediaType } = props;
    const { push } = useRouter();
    const {
        favoriteMovies,
        favoriteSeries,
        isLoggedIn
    } = useContext(UserDataContext);

    const {low_resolution_backdrop, low_resolution_poster} = tmdbConfig;

    const {
        addUserFavoritesToDb,
        deleteUserFavoritesOnDb
    } = useFirebase();

    const { dispatch } = useContext(GlobalEventsContext);

    const navigate = useCallback((mediaType: string, id: string) => {
        push(`player/${mediaType}/${id}`, {
            scroll: true
        });
    }, [push]);

    // Define se o filme/serie e favorito ou nao, caso seja, salva no banco de dados
    const updateUserFavorites = useCallback(async (contentId: string, mediaType: string) => {
        if (isLoggedIn) {
            const isFavoriteMovie = favoriteMovies?.includes(contentId);
            const isFavoriteSerie = favoriteSeries?.includes(contentId);

            if (!isFavoriteMovie && !isFavoriteSerie) {
                await addUserFavoritesToDb(contentId, mediaType);
                return;
            };

            await deleteUserFavoritesOnDb(contentId, mediaType);
            return;
        };

        dispatch({
            type: 'SET_ERROR', payload: {
                type: 'formInstructions',
                message: 'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
            }
        });
        dispatch({ type: 'IS_REGISTER_MODAL_ACTIVE', payload: true });
    }, [isLoggedIn, favoriteMovies, favoriteSeries, dispatch]);

    // verifica se o conteudo esta nos favorites e retorna true ou false
    const findFavoriteOnList = useCallback((id: string): boolean => {
        const isFavorite =
            favoriteMovies?.includes(id) ||
                favoriteSeries?.includes(id) ? true : false;
        return isFavorite;
    }, [favoriteMovies, favoriteSeries]);

    return data ? (
        <>
            <div className='movie-serie-section-container'>
                {data.map((card, index) => (
                    card.media_type !== 'person' ? (
                        // card
                        <div key={`result-${index}-${card.id}`} className='flex flex-col gap-y-[10px]'>
                            {/* imagem */}
                            <div className='card-image'>
                                {/* botão para adicionar o filme/serie aos favoritos */}
                                <FavoriteButton
                                    updateFavorites={updateUserFavorites}
                                    buttonId={card.id}
                                    isFavorite={findFavoriteOnList(card.id)}
                                    mediaType={mediaType ?? card.media_type}
                                />
                                {/* botao de play */}
                                <div
                                    className='play-icon-box'
                                    onClick={() => navigate(mediaType ?? card.media_type, card.id)} >
                                    <FaPlay className="text-primary-content text-lg translate-x-px" />
                                </div>

                                {/* Imagem do conteudo a ser exibido */}
                                <div
                                    className="scale-animation w-full h-full"
                                    onClick={() => navigate(mediaType ?? card.media_type, card.id)}>
                                    <img
                                        src={
                                            card.poster_path ?
                                                `${low_resolution_poster}${card.poster_path}` :
                                                `${low_resolution_backdrop}${card.backdrop_path}`
                                        }
                                        alt={`${card.title ?? card.name} ${mediaType} presentation image`}
                                        loading='lazy'
                                        className="image w-full h-full object-cover bg-surface"
                                    />
                                </div>
                            </div>

                            {/* Container de informações sobre o conteudo */}
                            <div className=" relative">
                                {/* Titulo */}
                                <p className="font-medium md:font-semibold text-base text-secondary line-clamp-1 lg:hidden">
                                    {card.title ?? card.name}
                                </p>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </>
    ) : null;
};