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
        <div className="flex items-center gap-x-5 text-base *:whitespace-nowrap">
            {/* botão de cadastro */}
            <button
                style={{ animationTimingFunction: 'ease' }}
                onClick={handleRegisterButton}
                className="px-5 h-10 rounded-md bg-secondary text-background outline-none border-none active:scale-95 transition-transform duration-200 cursor-pointer hidden font-semibold md:block lg:h-12">
                Criar conta
            </button>

            {/* botão de login */}
            <button 
                className="px-5 bg-secondary text-background cursor-pointer rounded-md h-10 font-semibold md:px-0 md:bg-transparent md:text-secondary md:font-medium"
                onClick={handleLoginButton}>
                Entrar
            </button>
        </div>
    );
};