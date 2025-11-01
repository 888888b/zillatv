'use client';
// hooks
import { useRouter } from 'next/navigation';
import { useContext, useCallback, useMemo } from 'react';
import useFirebase from '@/hooks/firebase';
// icones
import { FaBookmark } from "react-icons/fa";
// contextos
import { UserDataContext } from '@/contexts/authenticationContext';
import { GlobalEventsContext } from '@/contexts/globalEventsContext';
// utilitarios
import { tmdbConfig } from '@/app/constants';
import { openRegisterModal } from '@/utils/context/openRegisterModal';
import { showSuccessMsg } from '@/utils/toastfy/showSuccessMsg';
// componentes
import DetailsCard from '@/components/molecules/mediaDetailsCard';
// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
type ComponentProps = { data: tmdbObjProps[], mediaType?: string };

import './styles.css';

export default function MoviesSeriesSection(props: ComponentProps) {
    const { data } = props;
    const { push } = useRouter();
    const {
        isLoggedIn,
        favoriteMovies,
        favoriteSeries,
        setUserData
    } = useContext(UserDataContext);
    const {
        low_resolution_backdrop,
        low_resolution_poster
    } = tmdbConfig;
    const {
        addUserFavoritesToDb,
        deleteUserFavoritesOnDb
    } = useFirebase();
    const { dispatch } = useContext(GlobalEventsContext);
    const cardsData = useMemo(() => {
        const updatedData: tmdbObjProps[] | undefined = data?.map(slide => {
            return {
                ...slide,
                isFavorite: (favoriteMovies?.includes(slide.id) || favoriteSeries?.includes(slide.id) && isLoggedIn)
            };
        });
        return updatedData;
    }, [data, favoriteSeries, favoriteMovies, isLoggedIn]);

    // Define se o filme/serie e favorito ou nao, caso seja, salva no banco de dados
    const updateFavorites = useCallback(
        async (mediaId: string, mediaType: string, isOnDb: boolean)
            : Promise<void> => {
            // abre o modal de registro caso o usuario nao esteja logado para completar a ação
            if (!isLoggedIn) {
                openRegisterModal(
                    dispatch,
                    'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
                );
                return;
            };
            const addingMsg = mediaType === 'movie' ? 'Filme adicionado ✅' : 'Série adicionada ✅';
            const removingMsg = mediaType === 'movie' ? 'Filme removido ✅' : 'Série removida ✅';
            if (isOnDb) {
                await deleteUserFavoritesOnDb(mediaId, mediaType);
                showSuccessMsg(removingMsg);
            } else {
                await addUserFavoritesToDb(mediaId, mediaType, setUserData);
                showSuccessMsg(addingMsg);
            };
        }, [dispatch, isLoggedIn, deleteUserFavoritesOnDb, addUserFavoritesToDb]);

    const navigate = useCallback((mediaId: string, mediaType: string) => {
        dispatch({ type: 'IS_LOADING_ACTIVE', payload: true });
        push(`player/${mediaType}/${mediaId}`);
    }, [push, dispatch]);

    return cardsData ? (
        <>
            <div className='movie-serie-section'>
                {cardsData.map((media, index) => (
                    media.media_type !== 'person' ? (
                        // media
                        <div key={`result-${index}-${media.id}`} className='card'>
                            <div onClick={() => navigate(media.id, media.media_type)} className='card-img'>
                                {/* icone de favorito */}
                                {media.isFavorite &&
                                    <div className='bookmark-icon bg-background/60 w-[clamp(28px,3.55vw,36px)] aspect-square rounded-full flex items-center justify-center z-30 absolute top-[clamp(4px,1.2vw,12px)] right-[clamp(4px,1.2vw,12px)] text-primary [font-size:clamp(0.875rem,1.6vw,1rem)]'>
                                        <FaBookmark />
                                    </div>
                                }
                                {/* Imagem do filme/serie */}
                                <img
                                    src={
                                        media.poster_path ?
                                            `${low_resolution_poster}${media.poster_path}` :
                                            `${low_resolution_backdrop}${media.backdrop_path}`
                                    }
                                    alt={`Imagem poster de ${media.title ?? media.name}`}
                                    loading='lazy'
                                    className="img"
                                />
                            </div>
                            <DetailsCard
                                updateFavorites={updateFavorites}
                                navigate={navigate}
                                media={media}
                            />
                        </div>
                    ) : null
                ))}
            </div>
        </>
    ) : null;
};