'use client';
// hooks
import { useCallback, useContext, memo } from 'react';
import useFirebase from '@/hooks/firebase';
// utilitarios
import { showSuccessMsg } from '@/utils/toastfy/showSuccessMsg';
import { openRegisterModal } from '@/utils/context/openRegisterModal';
// contextos
import { UserDataContext } from '@/contexts/user';
import { ModalsContext } from '@/contexts/modal';
import { AuthContext } from '@/contexts/auth';
// icon
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
// tipos
import { ComponentPropsWithRef } from "react";
type ComponentProps = ComponentPropsWithRef<'button'> & {
    mediaId: string; 
    mediaType: string;
};

const AddToListButton = memo((props : ComponentProps) => {
    const {
        mediaId, 
        mediaType, 
        className, 
        ...rest
    } = props;
    const setModal = useContext(ModalsContext).dispatch;
    const setError = useContext(AuthContext).dispatch;
    const {
        isLoggedIn, 
        setUserData,
        favoriteMovies,
        favoriteSeries
    } = useContext(UserDataContext);
    const isFavorite = (
        favoriteMovies?.includes(mediaId) || 
        favoriteSeries?.includes(mediaId) && 
        isLoggedIn
    ) ?? false;
    const {
        deleteUserFavoritesOnDb,
        addUserFavoritesToDb
    } = useFirebase();

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

    return (
        <button
            {...rest}
            onClick={() => updateFavorites(mediaId, mediaType, isFavorite)}
            className={`pointer-events-auto outline-none w-[clamp(2.5rem,4.7vw,3rem)] aspect-square rounded-(--radius-button) 
            border-[clamp(0.125rem,0.1875vw,0.1875rem)] border-primary/70 text-primary/70 active:scale-95 transition-transform duration-200 flex 
            items-center justify-center cursor-pointer text-[clamp(1.25rem,2.4vw,1.5rem)] 
            lg:text-[clamp(1.5rem,1.75vw,1.75rem)] ${className}`}>
            { isFavorite ? 
                <PiBookmarkSimpleFill className='text-primary'/>
                :
                <PiBookmarkSimpleBold className='text-primary'/>
            }
        </button>
    );
});

AddToListButton.displayName = 'AddToListButton';
export default AddToListButton;