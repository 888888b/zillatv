// hooks
import { useContext } from "react";

// contextos
import { GlobalEventsContext } from "@/contexts/globalEventsContext";

export default function AuthButtons() {

    const {
        dispatch
    } = useContext( GlobalEventsContext );

    const handleLoginButton = () => {
        dispatch({type: 'IS_LOGIN_MODAL_ACTIVE', payload: true});
    };

    const handleRegisterButton = () => {
        dispatch({type: 'IS_REGISTER_MODAL_ACTIVE', payload: true});
    }; 

    return (
        <div className="flex items-center gap-x-5">
            {/* botão de cadastro */}
            <button
                style={{ animationTimingFunction: 'ease' }}
                onClick={handleRegisterButton}
                className="px-4 h-11 lg:h-[46px] rounded-[10px] bg-accent md:hover:scale-105 duration-300 text-black text-sm font-bold outline-none border-none">
                Criar conta
            </button>

            {/* botão de login */}
            <button 
                className="text-white text-sm outline-none border-none"
                onClick={handleLoginButton}>
                Entrar
            </button>
        </div>
    );
};