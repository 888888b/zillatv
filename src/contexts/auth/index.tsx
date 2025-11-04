'use client';
import { createContext, useReducer, ReactNode, Dispatch } from 'react';

export type ErrorMessages = {
    login: string;
    register: string;
    formInstructions: string;
    googleAuth: string;
    githubAuth: string;
    emailVerification: string;
};

export type AuthState = {
    isUserCreatingAnAccount: boolean;
    isUserLoggingIntoAccount: boolean;
    isProfilePhotoUpdating: boolean;
    errors: ErrorMessages;
    dispatch: Dispatch<Action>;
};

export type Action = { 
    type: 
    'IS_ACCOUNT_BEING_CREATED' | 
    'IS_USER_LOGGING_INTO_ACCOUNT' | 
    'IS_PROFILE_PHOTO_UPDATING' | 
    'SET_ERROR'; 
    payload: any;
};

const initialState: AuthState = {
    isUserCreatingAnAccount: false,
    isUserLoggingIntoAccount: false,
    isProfilePhotoUpdating: false,
    errors: {
        login: '',
        register: '',
        formInstructions: '',
        googleAuth: '',
        githubAuth: '',
        emailVerification: ''
    },
    dispatch: () => {}
};

function reducer(state: AuthState, action: Action): AuthState {
    switch (action.type) {
        case 'IS_ACCOUNT_BEING_CREATED':
            return { ...state, isUserCreatingAnAccount: action.payload };

        case 'IS_USER_LOGGING_INTO_ACCOUNT':
            return { ...state, isUserLoggingIntoAccount: action.payload };

        case 'IS_PROFILE_PHOTO_UPDATING':
            return { ...state, isProfilePhotoUpdating: action.payload };

        case 'SET_ERROR':
            return {
                ...state,
                errors: { ...state.errors, [action.payload.type]: action.payload.message },
            };

        default:
            return state;
    };
};

export const AuthContext = createContext<AuthState>(initialState);
export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
