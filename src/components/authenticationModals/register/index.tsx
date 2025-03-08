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
import RegisterForm from "./form";

// tipos
import { RegisterProps } from "./form";

export default function RegisterModal() {

    // ações do usuario
    const { 
        registerUser, 
        signInWithGoogle, 
        signInWithGithub 
    } = useFirebase();

    // controle do modal de registro
    const {
        isRegisterModalActive,
        dispatch,
        errors
    } = useContext( GlobalEventsContext );

    const checkboxInputRef = useRef<(HTMLInputElement | null)>( null );

    // Simula um click para o input que exibe/esconde o modal de regitro
    const checkboxToggle = () => {
        if ( checkboxInputRef.current ) {
            if ( isRegisterModalActive ) {
                checkboxInputRef.current.checked = true;
                return;
            };

            checkboxInputRef.current.checked = false;
        };
    };

    useEffect(() => {
        checkboxToggle();
    },[ isRegisterModalActive ]);

    // Tenta registrar o usuario, se for sucesso, atualiza os dados do usuario dentro do contexto e fecha o modal
    const handleFormSubmit = useCallback(( schemaData: RegisterProps ) => {
        registerUser( 
            schemaData.name.trimEnd(), 
            schemaData.email.trimEnd(), 
            schemaData.password.trimEnd() 
        );
    }, []);

    return (
        <>
            <input type="checkbox" ref={checkboxInputRef} id="my_modal_6" className="modal-toggle" />
            <div className="modal h-lvh overflow-y-scroll w-screen overflow-x-hidden" role="dialog">
                {/* Conteudo do modal */}
                <div className="z-50 bg-darkpurple rounded-md font-noto_sans px-4 my-10 py-5 w-[calc(100%-32px)] max-w-[420px] relative">
                   <h3 className="text-2xl font-raleway font-bold">Registre-se</h3>

                   { errors.formInstructions ? (
                        <p 
                            className="text-orangered font-normal mt-1 text-[17px] max-[620px]:static">
                            {errors.formInstructions}
                        </p>
                    ) : null } 
                   
                   {/* Botão de login com google */}
                   <button 
                        className="w-full h-12 rounded-md mt-7 bg-white text-black text-base font-semibold px-3 flex items-center gap-x-2 border-none outline-none btn hover:bg-white justify-start"
                        onClick={() => {signInWithGoogle('register')}}>
                        <FcGoogle className="text-3xl"/>
                        continuar com o google
                   </button>

                   {/* Renderiza o erro passado pelo contexto caso houver, se não, renderiza o erro do registerSchema */}
                   { errors.googleAuth ? (
                        <p 
                            className="text-orangered font-medium mt-1 text-base max-[620px]:static">{errors.googleAuth}
                        </p>
                    ) : null }

                    {/* Botão de login com github */}
                   <button 
                        className="w-full h-12 rounded-md mt-4 bg-deepnight text-white text-base font-semibold px-3 flex items-center gap-x-2 border-none justify-start outline-none btn hover:bg-deepnight"
                        onClick={() => {signInWithGithub('register')}}>
                        <FaGithub className="text-3xl"/>
                        continuar com o github
                   </button>

                    {/* Renderiza o erro passado pelo contexto caso houver, se não, renderiza o erro do registerSchema */}
                    { errors.githubAuth ? (
                        <p 
                            className="text-orangered font-medium mt-1 text-base max-[620px]:static">{errors.githubAuth}
                        </p>
                    ) : null }

                   <div className="my-6 w-full roude relative before:w-full before:h-0.5 before:rounded-xl before:bg-darkslateblue before:absolute flex items-center justify-center before:-z-10">
                        <p className="px-3 bg-darkpurple text-[15px]">Ou</p>
                   </div>

                    {/* Formulario de registro em src/components/authenticateUsers/registerModal/form */}
                   <RegisterForm registerUser={handleFormSubmit}/>

                    {/* Botão de fechamento do modal */}
                    <button 
                        onClick={() => dispatch({type:'IS_REGISTER_MODAL_ACTIVE', payload: false})} 
                        className="modal-actio bg-darkslateblue w-10 h-10 rounded-full flex items-center justify-center absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 cursor-pointer border-none outline-none">
                        <IoClose className='text-xl'/>
                    </button>
                </div>

                {/* Overlay */}
                <div className="w-screen min-h-screen fixed top-0 left-0 bg-black/80"></div>
            </div>
        </>
    );
};