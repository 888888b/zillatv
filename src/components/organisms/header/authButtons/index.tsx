// hooks
import { useContext, useCallback } from "react";

// contextos
import { GlobalEventsContext } from "@/contexts/globalEventsContext";

export default function AuthButtons() {

    const {
        dispatch
    } = useContext( GlobalEventsContext );

    const handleLoginButton = useCallback(() => {
        dispatch({type: 'IS_LOGIN_MODAL_ACTIVE', payload: true});
    }, [ dispatch ]);

    const handleRegisterButton = useCallback(() => {
        dispatch({type: 'IS_REGISTER_MODAL_ACTIVE', payload: true});
    }, [ dispatch ]); 

    return (
        <div className="flex items-center gap-x-5 font-bold text-sm *:uppercase">
            {/* botão de cadastro */}
            <button
                style={{ animationTimingFunction: 'ease' }}
                onClick={handleRegisterButton}
                className="px-5 h-11 rounded-[10px] bg-secondary text-primary-content font-semibold outline-none border-none active:scale-95 transition-transform duration-200 cursor-pointer">
                Criar conta
            </button>

            {/* botão de login */}
            <button 
                className="text-text lg:text-secondary/90 cursor-pointer hover:text-primary transition-colors duration-300"
                onClick={handleLoginButton}>
                Entrar
            </button>
        </div>
    );
};