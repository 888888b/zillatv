// tipos
import { Action } from "@/contexts/globalEventsContext";
import { Dispatch } from "react";

export const openRegisterModal = (dispatch: Dispatch<Action>, msg?: string) => {
    dispatch({ type: 'IS_REGISTER_MODAL_ACTIVE', payload: true });
    if (msg) {
        dispatch({
            type: 'SET_ERROR', payload: {
                type: 'formInstructions',
                message: msg
            }
        });
    };
};