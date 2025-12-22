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
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
type ComponentProps = {
    data: TmdbMediaProps[];
    mediaType?: "tv" | "movie" | "serie";
    lang: string;
};

import './styles.css';

export default function MoviesSeriesSection({ data, lang }: ComponentProps) {
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

    const addToFavorites = useCallback(async (mediaId: string, mediaType: string): Promise<void> => {
        const addingMsg = mediaType === 'movie' ? 'Filme adicionado ✅' : 'Série adicionada ✅';
        await addUserFavoritesToDb(mediaId, mediaType, setUserData);
        showSuccessMsg(addingMsg);
    }, [showSuccessMsg, addUserFavoritesToDb]);

    const removeFromFavorites = useCallback(async (mediaId: string, mediaType: string): Promise<void> => {
        const removingMsg = mediaType === 'movie' ? 'Filme removido ✅' : 'Série removida ✅';
        await deleteUserFavoritesOnDb(mediaId, mediaType);
        showSuccessMsg(removingMsg);
    }, [deleteUserFavoritesOnDb, showSuccessMsg]);

    // lida com adição/remoção do filme/series da lista de favoritos
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
            isOnDb ? removeFromFavorites(mediaId, mediaType) : addToFavorites(mediaId, mediaType);
        }, [isLoggedIn, addToFavorites, removeFromFavorites]);

    // leva para a pagina do player
    const navigateToPlayer = useCallback((mediaId: string, mediaType: string) => {
        setEvent({ type: 'IS_LOADING_ACTIVE', payload: true });
        push(`/${lang.toLowerCase()}/player/${mediaType}/${mediaId}`);
    }, [push, setEvent, lang]);

    return cardsData ? (
        <div
            className="
            media-section
            grid w-full gap-2
            pb-2
            grid-cols-[repeat(auto-fill,minmax(calc((100%-16px)/3),1fr))]
            md:grid-cols-[repeat(auto-fill,minmax(calc((100%-24px)/4),1fr))]
            lg:grid-cols-[repeat(auto-fill,minmax(calc((100%-32px)/5),1fr))]
            xl:grid-cols-[repeat(auto-fill,minmax(calc((100%-40px)/6),1fr))]
            2xl:grid-cols-[repeat(auto-fill,minmax(calc((100%-48px)/7),1fr))]
            ">
            {cardsData.map(media =>
                media.media_type !== 'person' ? (
                    <div key={`card-${media.id}`} className="card relative [transition:transform_0.25s_ease-out] hover:transform-[scale(1.06)] will-change-transform origin-center cursor-pointer">
                        <div
                            onClick={() => navigateToPlayer(media.id, media.media_type)}
                            className="relative w-full overflow-hidden rounded-(--radius-button) aspect-[1/1.4] bg-surface"
                        >
                            {media.isFavorite && (
                                <div className="
                                    bookmark-icon
                                    absolute z-30
                                    top-[clamp(4px,1.2vw,12px)]
                                    right-[clamp(4px,1.2vw,12px)]
                                    w-[clamp(28px,3.55vw,36px)]
                                    aspect-square
                                    rounded-full
                                    flex items-center justify-center
                                    bg-background/60
                                    text-primary
                                    text-[clamp(0.875rem,1.6vw,1rem)]">
                                    <FaBookmark />
                                </div>
                            )}

                            <img
                                src={
                                    media.poster_path
                                        ? `${low_resolution_poster}${media.poster_path}`
                                        : `${low_resolution_backdrop}${media.backdrop_path}`
                                }
                                alt={`Imagem poster de ${media.title ?? media.name}`}
                                loading="lazy"
                                className="img w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ) : null
            )}
        </div>
    ) : null
};