// hooks
import { useContext } from "react";

// contextos
import { GlobalEventsContext } from "@/components/contexts/globalEventsContext";

export default function AuthButtons() {

    const {
        setModalsController
    } = useContext( GlobalEventsContext );

    const handleButtonclick = ( modalType: 'login' | 'register' ) => {
        if ( modalType === 'login' ) {
            // ativa o modal de login
            setModalsController( prev => ({
                ...prev,
                isLoginModalActive: true
            }));
            return
        };

        // ativa o modal de cadastro
        setModalsController( prev => ({
            ...prev,
            isRegisterModalActive: true
        }));
    };

    return (
        <div className="flex items-center gap-x-5">
            {/* botão de cadastro */}
            <button
                style={{ animationTimingFunction: 'ease' }}
                onClick={() => handleButtonclick('register')}
                className="px-4 h-11 lg:h-[46px] rounded-[10px] bg-accent md:hover:scale-105 duration-300 text-black text-sm font-bold outline-none border-none">
                Criar conta
            </button>

            {/* botão de login */}
            <button 
                className="text-white text-sm outline-none border-none"
                onClick={() => handleButtonclick('login')}>
                Entrar
            </button>
        </div>
    );
};