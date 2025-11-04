'use client';
import { createContext, useReducer, ReactNode, Dispatch } from 'react';

export interface ModalsState {
    isRegisterModalActive: boolean;
    isLoginModalActive: boolean;
    isProfileModalActive: boolean;
};

export type Action = {
    type:
    'IS_REGISTER_MODAL_ACTIVE' |
    'IS_LOGIN_MODAL_ACTIVE' |
    'IS_PROFILE_MODAL_ACTIVE';
    payload: ModalsState[keyof ModalsState];
};

export interface ContextProps extends ModalsState {
    dispatch: Dispatch<Action>;
};

const initialState: ContextProps = {
    isRegisterModalActive: false,
    isLoginModalActive: false,
    isProfileModalActive: false,
    dispatch: () => {}
};

function reducer(state: ModalsState, action: Action): ModalsState {
    switch (action.type) {
        case 'IS_REGISTER_MODAL_ACTIVE':
            return { ...state, isRegisterModalActive: action.payload };

        case 'IS_LOGIN_MODAL_ACTIVE':
            return { ...state, isLoginModalActive: action.payload };

        case 'IS_PROFILE_MODAL_ACTIVE':
            return { ...state, isProfileModalActive: action.payload };

        default:
            return state;
    };
};

export const ModalsContext = createContext<ContextProps>(initialState);
export function ModalsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ModalsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ModalsContext.Provider>
    );
}
