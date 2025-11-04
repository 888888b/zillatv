// tipos
import { Action as ModalAction } from "@/contexts/modal";
import { Action as ErrorAction } from '@/contexts/auth';
import { Dispatch } from "react";

export const openRegisterModal = (
    setModal: Dispatch<ModalAction>, 
    setError: Dispatch<ErrorAction>, 
    msg?: string
    ) => {
    setModal({ type: 'IS_REGISTER_MODAL_ACTIVE', payload: true });
    if (msg) {
        setError({
            type: 'SET_ERROR', payload: {
                type: 'formInstructions',
                message: msg
            }
        });
    };
};