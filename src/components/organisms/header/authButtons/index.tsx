// hooks
import { useContext, useCallback } from "react";
// contextos
import { ModalsContext } from "@/contexts/modal";

export default function AuthButtons() {
    const {dispatch} = useContext(ModalsContext);

    const handleLoginButton = useCallback(() => {
        dispatch({type: 'IS_LOGIN_MODAL_ACTIVE', payload: true});
    }, [ dispatch ]);

    const handleRegisterButton = useCallback(() => {
        dispatch({type: 'IS_REGISTER_MODAL_ACTIVE', payload: true});
    }, [ dispatch ]); 

    return (
        <div className="flex items-center gap-x-5 *:[font-size:clamp(1rem,1.15vw,1.125rem)] *:whitespace-nowrap">
            {/* botão de cadastro */}
            <button
                style={{ animationTimingFunction: 'ease' }}
                onClick={handleRegisterButton}
                className="px-[1.25em] h-10 rounded-md bg-secondary text-background outline-none border-none active:scale-95 transition-transform duration-200 cursor-pointer hidden font-semibold md:block lg:h-12">
                Criar conta
            </button>

            {/* botão de login */}
            <button 
                className="px-[1.25em] bg-secondary text-background cursor-pointer rounded-md h-10 font-semibold md:px-0 md:bg-transparent md:text-text md:hover:text-secondary md:transition-colors md:duration-300 md:font-medium"
                onClick={handleLoginButton}>
                Entrar
            </button>
        </div>
    );
};