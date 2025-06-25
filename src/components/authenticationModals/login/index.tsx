'use client';

// hooks
import { 
    useEffect, 
    useRef, 
    useContext, 
    useCallback 
} from "react";
import useFirebase from "@/components/hooks/firebase";

// contextos
import { GlobalEventsContext } from "@/contexts/globalEventsContext";

// icones
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// componentes
import LoginForm from './form';

// tipos
import { LoginProps } from "./form";

export default function LoginModal() {

    // ações do usuario
    const { 
        authenticateUser, 
        signInWithGoogle, 
        signInWithGithub 
    } = useFirebase();

    // controle do modal de login
    const {
        isLoginModalActive,
        dispatch,
        errors
    } = useContext( GlobalEventsContext );

    const checkboxInputRef = useRef<(HTMLInputElement | null)>( null );

   // Simula um click para o input que exibe/esconde o modal de regitro
   const checkboxToggle = () => {
        if ( checkboxInputRef.current ) {
            if ( isLoginModalActive ) {
                checkboxInputRef.current.checked = true;
                return;
            };

            checkboxInputRef.current.checked = false;
        };
    };

    useEffect(() => {
        checkboxToggle();
    },[ isLoginModalActive ]);
    
    // Tenta authenticar o usuario, se for sucesso, atualiza os dados do usuario dentro do contexto e fecha o modal
    const handleFormSubmit = useCallback(( schemaData: LoginProps ) => {
        authenticateUser( 
            schemaData.email.trimEnd(), 
            schemaData.password.trimEnd(), 
            'login' 
        );
    }, []);

    return (
        <>
            <input type="checkbox" ref={checkboxInputRef} id="my_modal_6" className="modal-toggle" />
            <div className="modal h-dvh" role="dialog">
                {/* Conteudo do modal */}
                <div className="z-50 bg-darkpurple rounded font-noto_sans px-4 py-5 w-[calc(100%-32px)] max-w-[420px] relative">
                   <h3 className="text-2xl font-bold font-raleway">Entrar</h3>

                   { errors.formInstructions ? (
                        <p 
                            className="text-orangered font-normal mt-1 text-base max-[620px]:static">{errors.formInstructions}
                        </p>
                    ) : null } 
                   
                   {/* Botão de login com google */}
                   <button 
                        className="w-full h-12 rounded mt-7 bg-white text-black text-base font-semibold px-3 flex items-center gap-x-2 border-none outline-none btn hover:bg-white justify-start"
                        onClick={() => {signInWithGoogle('login')}}>
                        <FcGoogle className="text-3xl"/>
                        continuar com o google
                   </button>

                   { errors.googleAuth ? (
                        <p 
                            className="text-orangered font-normal mt-1 text-base max-[620px]:static">{errors.googleAuth}
                        </p>
                    ) : null } 

                    {/* Botão de login com github */}
                   <button 
                        className="w-full h-12 rounded mt-4 bg-deepnight text-white text-base font-semibold px-3 flex items-center gap-x-2 border-none justify-start outline-none btn hover:bg-deepnight"
                        onClick={() => {signInWithGithub('login')}}>
                        <FaGithub className="text-3xl"/>
                        continuar com o github
                   </button>

                   {/* Renderiza o erro passado pelo contexto caso houver, se não, renderiza o erro do loginSchema */}
                    { errors.githubAuth ? (
                        <p 
                            className="text-orangered font-normal mt-1 text-base max-[620px]:static">{errors.githubAuth}
                        </p>
                    ) : null } 

                   <div className="my-6 w-full roude relative before:w-full before:h-0.5 before:rounded-xl before:bg-darkslateblue before:absolute flex items-center justify-center before:-z-10">
                        <p className="px-3 bg-darkpurple text-base">Ou</p>
                   </div>

                    {/* Formulario de login em src/components/authenticateUsers/loginModal/form */}
                   <LoginForm authenticateUser={handleFormSubmit}/>

                    {/* Botão de fechamento do modal */}
                    <button 
                        onClick={() => dispatch({type: 'IS_LOGIN_MODAL_ACTIVE', payload: false})} 
                        className="modal-actin bg-darkslateblue w-10 h-10 rounded-full flex items-center justify-center absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 cursor-pointer border-none outline-none">
                        <IoClose className='text-xl'/>
                    </button>
                </div>

                {/* overlay*/}
                <div className="fixed top-0 left-0 w-full h-dvh bg-black/80"></div>
            </div>
        </>
    );
};