import {app} from '../index';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref as getDatabaseRef, get } from 'firebase/database';
import { Dispatch, SetStateAction } from 'react';
import { UserDataProps } from '@/contexts/authenticationContext';
type SetUserProps = Dispatch<SetStateAction<UserDataProps>>

export const getUserFavoritesOnDb = async (setUserData: SetUserProps) => {
    const db = getDatabase(app);
    const auth = getAuth()
    const user = auth.currentUser;
    if (!user) throw new Error('Firebase: Erro ao adicionar aos favoritos: usuário não autenticado.')
    const userRef = getDatabaseRef(db, `users/${user.uid}`);
    try {
        const data = (await get(userRef)).val();
        if (data) {
            setUserData(prev => ({ ...prev, favoriteMovies: data.favoriteMovies ?? null }));
            setUserData(prev => ({ ...prev, favoriteSeries: data.favoriteSeries ?? null }));
        }
    } catch (error) {
        console.error('Firebase: Erro ao buscar os favoritos do usuario' + error);
    };
};