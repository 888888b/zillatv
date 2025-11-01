import {app} from '../index';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref as getDatabaseRef, get, update} from 'firebase/database';
import { Dispatch, SetStateAction } from 'react';
import { UserDataProps } from '@/contexts/authenticationContext';

// Adiciona os filmes/series favoritos do usuario ao banco de dados
export const addUserFavoritesToDb = async (
    mediaId: string,
    mediaType: string,
    setUserData: Dispatch<SetStateAction<UserDataProps>>
): Promise<void> => {
    const db = getDatabase(app);
    const auth = getAuth()
    const user = auth.currentUser;
    if (!user) throw new Error('Firebase: Erro ao adicionar aos favoritos: usuário não autenticado.')
    const userRef = getDatabaseRef(db, `users/${user.uid}`);
    const updatedMediaList: string[] = [];
    try {
        // busca e tratamento dos dados
        const data = (await get(userRef)).val();
        // verifica se o filme ja existe dentre os dados
        if (mediaType === 'movie') {
            const moviesList: string[] = [];
            if (data.favoriteMovies) {
                if (data.favoriteMovies.includes(mediaId)) return;
                moviesList.push(mediaId, ...data.favoriteMovies);
            } else {
                moviesList.push(mediaId);
            };
            updatedMediaList.push(...moviesList);
        // verifica se a serie ja existe dentre os dados
        } else {
            const seriesList: string[] = [];
            if (data.favoriteSeries) {
                if (data.favoriteSeries.includes(mediaId)) return;
                seriesList.push(mediaId, ...data.favoriteSeries);
            } else {
                seriesList.push(mediaId);
            };
            updatedMediaList.push(...seriesList);
        };
        // define o campo / atualiza a lista de favoritos
        const fieldToUpdate = mediaType === 'movie' ?
            { favoriteMovies: updatedMediaList } : { favoriteSeries: updatedMediaList };
        await update(userRef, fieldToUpdate);
        // atualiza o contexto / UI
        setUserData(prev => ({...prev, ...fieldToUpdate}));
    } catch (error) {
        throw new Error('Firebase: Erro ao adicionar item aos favoritos do usuario' + error);
    };
};