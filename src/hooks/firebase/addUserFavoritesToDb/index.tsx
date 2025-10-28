import {app} from '../index';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref as getDatabaseRef, get, update} from 'firebase/database';

// Adiciona os filmes/series favoritos do usuario ao banco de dados
export const addUserFavoritesToDb = async (
    mediaId: string,
    mediaType: string
): Promise<void> => {
    const db = getDatabase(app);
    const auth = getAuth()
    const user = auth.currentUser;
    if (!user) throw new Error('Firebase: Erro ao adicionar aos favoritos: usuário não autenticado.')
    const userRef = getDatabaseRef(db, `users/${user.uid}`);
    try {
        const updatedMediaList: string[] = [];
        const snapshot = (await get(userRef)).val();
        if (mediaType === 'movie') {
            const moviesList: string[] = [];
            if (snapshot.favoriteMovies) {
                if (snapshot.favoriteMovies.includes(mediaId)) return;
                moviesList.push(mediaId, ...snapshot.favoriteMovies);
            } else {
                moviesList.push(mediaId);
            };
            updatedMediaList.push(...moviesList);
        } else {
            const seriesList: string[] = [];
            if (snapshot.favoriteSeries) {
                if (snapshot.favoriteSeries.includes(mediaId)) return;
                seriesList.push(mediaId, ...snapshot.favoriteSeries);
            } else {
                seriesList.push(mediaId);
            };
            updatedMediaList.push(...seriesList);
        };
        const fieldToUpdate = mediaType === 'movie' ?
            { favoriteMovies: updatedMediaList } : { favoriteSeries: updatedMediaList };
        await update(userRef, fieldToUpdate);

    } catch (error) {
        throw new Error('Firebase: Erro ao adicionar item aos favoritos do usuario' + error);
    };
};