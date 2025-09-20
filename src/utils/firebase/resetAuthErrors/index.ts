// tipos
import { ErrorMessages, Action } from "@/contexts/globalEventsContext";
export type ErrorMessage = keyof ErrorMessages;
type Dispatch = (value: Action) => void;

export const resetAuthErrors = (authErrors: ErrorMessages, dispatch: Dispatch): void => {
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