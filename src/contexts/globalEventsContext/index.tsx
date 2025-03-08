'use client';

import { createContext, ReactNode, useReducer } from "react";

type ErrorMessages = {
    login: string;
    register: string;
    formInstructions: string;
    googleAuth: string;
    githubAuth: string;
    emailVerification: string;
};

export interface ModalsControllerProps {
    isRegisterModalActive: boolean;
    isLoginModalActive: boolean; 
    isProfileModalActive: boolean;
    errors: ErrorMessages;
    isProfilePhotoUpdating: boolean;
    isUserCreatingAnAccount: boolean;
    isUserLoggingIntoAccount: boolean;
    clicksCount: number;
};

// Ação para alterar o estado dos modais
type Action = { type: string, payload?: any };

const initialState = {
    isRegisterModalActive: false,
    isLoginModalActive: false,
    isProfileModalActive: false,
    isProfilePhotoUpdating: false,
    isUserCreatingAnAccount: false,
    isUserLoggingIntoAccount: false,
    clicksCount: 0,
    errors: {
        login: '',
        register: '',
        formInstructions: '',
        googleAuth: '',
        githubAuth: '',
        emailVerification: ''
    }
};

const reducer = (state: ModalsControllerProps, action: Action): ModalsControllerProps => {
    switch (action.type) {
        case 'IS_REGISTER_MODAL_ACTIVE':
            return { ...state, isRegisterModalActive: action.payload };

        case 'IS_LOGIN_MODAL_ACTIVE':
            return { ...state, isLoginModalActive: action.payload };

        case 'IS_PROFILE_MODAL_ACTIVE':
            return { ...state, isProfileModalActive: action.payload };

        case 'IS_PROFILE_PHOTO_UPDATING':
            return { ...state, isProfilePhotoUpdating: action.payload };

        case 'IS_ACCOUNT_BEING_CREATED':
            return { ...state, isUserCreatingAnAccount: action.payload };

        case 'IS_USER_LOGGING_INTO_ACCOUNT':
            return { ...state, isUserLoggingIntoAccount: action.payload };

        case 'SET_ERROR':
            return { 
                ...state, 
                errors: { ...state.errors, [action.payload.type]: action.payload.message } 
            };

        case 'INCREMENT_CLICKS':
            return { ...state, clicksCount: state.clicksCount + 1 };

        default:
            return state;
    };
};

interface GlobalEventsContextType extends ModalsControllerProps {
    dispatch: React.Dispatch<Action>;
};

export const GlobalEventsContext = createContext<GlobalEventsContextType>(initialState as any);

export const GlobalEventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    return (
        <GlobalEventsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </GlobalEventsContext.Provider>
    )
};