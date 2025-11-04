'use client';
import { createContext, useReducer, ReactNode, Dispatch } from 'react';

export type Action = { 
    type: 'IS_LOADING_ACTIVE'; 
    payload: boolean; 
};

export type GlobalState = {
    isLoadingActive: boolean;
    dispatch: Dispatch<Action>;
};

const initialState: GlobalState = {
    isLoadingActive: true,
    dispatch: () => {}
};

function reducer(state: GlobalState, action: Action): GlobalState {
    switch (action.type) {
        case 'IS_LOADING_ACTIVE':
            return { ...state, isLoadingActive: action.payload };

        default:
            return state;
    };
};

export const GlobalContext = createContext<GlobalState>(initialState);
export function GlobalProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <GlobalContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
