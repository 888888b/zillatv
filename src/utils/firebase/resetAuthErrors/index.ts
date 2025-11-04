// tipos
import { ErrorMessages, Action } from "@/contexts/auth";
import { Dispatch } from "react";
export type ErrorMessage = keyof ErrorMessages;

export const resetAuthErrors = (authErrors: ErrorMessages, dispatch: Dispatch<Action>): void => {
    const errorsList = Object.keys(authErrors) as ErrorMessage[];
    errorsList.forEach((error) => {
        if (authErrors[error]) {
            dispatch({
                type: 'SET_ERROR', payload: {
                    type: error,
                    message: ''
                }
            });
        };
    });
};