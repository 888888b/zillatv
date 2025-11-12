'use client';
// hooks
import { useRouter } from 'next/navigation';
import { useContext, useCallback, memo } from 'react';
import useFirebase from '@/hooks/firebase';
// icones
import { FaBookmark } from "react-icons/fa";
// contextos
import { UserDataContext } from '@/contexts/user';
import { GlobalContext } from "@/contexts/global";
import { ModalsContext } from '@/contexts/modal';
import { AuthContext } from '@/contexts/auth';
// utilitarios
import { tmdbConfig } from '@/app/[lang]/constants';
import { openRegisterModal } from '@/utils/context/openRegisterModal';
import { showSuccessMsg } from '@/utils/toastfy/showSuccessMsg';
// componentes
import DetailsCard from '@/components/molecules/mediaDetailsCard';
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
type ComponentProps = { 
    data: TmdbMediaProps[]; 
    mediaType?: string;
    lang: string;
};

import './styles.css';

export default function MoviesSeriesSection({data, lang}: ComponentProps) {
    const { push } = useRouter();
    const setEvent = useContext(GlobalContext).dispatch;
    const setModal = useContext(ModalsContext).dispatch;
    const setError = useContext(AuthContext).dispatch;
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
    const cardsData: TmdbMediaProps[] | undefined = data?.map(slide => {
        return {
            ...slide,
            isFavorite: (favoriteMovies?.includes(slide.id) || favoriteSeries?.includes(slide.id) && isLoggedIn)
        };
    });

    // Define se o filme/serie e favorito ou nao, caso seja, salva no banco de dados
    const updateFavorites = useCallback(
        async (mediaId: string, mediaType: string, isOnDb: boolean)
            : Promise<void> => {
            // abre o modal de registro caso o usuario nao esteja logado para completar a ação
            if (!isLoggedIn) {
                openRegisterModal(
                    setModal,
                    setError,
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
        }, [setModal, setError, isLoggedIn, deleteUserFavoritesOnDb, addUserFavoritesToDb]);

    // leva para a pagina do player
    const navigateToPlayer = useCallback((mediaId: string, mediaType: string) => {
        setEvent({ type: 'IS_LOADING_ACTIVE', payload: true });
        push(`/${lang.toLowerCase()}/player/${mediaType}/${mediaId}`);
    }, [push, setEvent, lang]);

    return cardsData ? (
        <>
            <div className='movie-serie-section'>
                {cardsData.map(media => (
                    media.media_type !== 'person' ? (
                        <div key={`card-${media.id}`} className='card'>
                            <div onClick={() => navigateToPlayer(media.id, media.media_type)} className='card-img'>
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
                                navigate={navigateToPlayer}
                                media={media}
                                lang={lang}
                            />
                        </div>
                    ) : null
                ))}
            </div>
        </>
    ) : null;
};