'use client';

import React, { createContext, Dispatch, ReactNode, useState } from "react";

export interface UserData {
    isLoggedIn: boolean;
    name: null | string;
    email: null | string;
    photoUrl: null | string;
    favoriteMovies: null | string[];
    favoriteSeries: null | string[];
    uid: null | string;
};

interface ContextProps extends UserData {
    setUserData: Dispatch<React.SetStateAction<UserData>>;
};

export const UserDataContext = createContext<ContextProps>({
    isLoggedIn: false,
    name: null,
    email: null,
    photoUrl: null,
    favoriteMovies: null,
    favoriteSeries: null,
    uid: null,
    setUserData: () => {}
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ userData, setUserData ] = useState<UserData>({
        isLoggedIn: false,
        name: null,
        email: null,
        photoUrl: null,
        favoriteMovies: null,
        favoriteSeries: null,
        uid: null
    });
    return (
        <UserDataContext.Provider value={{ ...userData, setUserData }}>
            { children }
        </UserDataContext.Provider>
    )
};