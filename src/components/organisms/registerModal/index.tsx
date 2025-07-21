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
import { HiOutlineMail } from "react-icons/hi";

// componentes
import RegisterForm from "./form";
import { CloseButton } from "@/components/atoms/closeButton";
import { GoogleAuthButton } from "@/components/atoms/googleAuthButton";
import { ModalTitle } from "@/components/atoms/modalTitle";

// tipos
import { RegisterProps } from "./form";

export default function RegisterModal() {

    // ações do usuario
    const {
        registerUser,
        signInWithGoogle,
    } = useFirebase();

    // controle do modal de registro
    const {
        isRegisterModalActive,
        dispatch,
        errors,
        isUserCreatingAnAccount
    } = useContext(GlobalEventsContext);

    const checkboxInputRef = useRef<HTMLInputElement | null>(null);

    // Simula um click para o input que exibe/esconde o modal de regitro
    const checkboxToggle = useCallback((): void => {
        if (!checkboxInputRef.current) return;

        if (isRegisterModalActive) {
            checkboxInputRef.current.checked = true;
        } else {
            checkboxInputRef.current.checked = false;
        };
    }, [isRegisterModalActive, checkboxInputRef]);

    useEffect(() => {
        checkboxToggle();
    }, [isRegisterModalActive]);

    // Tenta registrar o usuario, se for sucesso, atualiza os dados do usuario dentro do contexto e fecha o modal
    const handleFormSubmit = useCallback(
        (schemaData: RegisterProps): void => {
            registerUser(
                schemaData.name.trimEnd(),
                schemaData.email.trimEnd(),
                schemaData.password.trimEnd()
            );
        }, [registerUser]);


    // fecha o modal | reseta qualquer mensagem de erro
    const closeModal = useCallback((): void => {
        if (errors.formInstructions) {
            dispatch({
                type: 'SET_ERROR', payload: {
                    type: 'formInstructions',
                    message: ''
                }
            });
        };

        if (errors.googleAuth) {
            dispatch({
                type: 'SET_ERROR', payload: {
                    type: 'googleAuth',
                    message: ''
                }
            });
        };

        if (errors.register) {
            dispatch({
                type: 'SET_ERROR', payload: {
                    type: 'register',
                    message: ''
                }
            });
        };
        dispatch({ type: 'IS_REGISTER_MODAL_ACTIVE', payload: false });
    }, [dispatch, errors]);

    const googleSignIn = useCallback((): void => {
        signInWithGoogle('register');
    }, [signInWithGoogle]);

    return (
        <>
            <input type="checkbox" ref={checkboxInputRef} id="my_modal_6" className="modal-toggle" />
            <div className="modal" style={{ overflowY: 'visible', transition: 'all 0s linear' }} role="dialog">
                {/* Conteudo do modal */}
                <div className="z-50 bg-surface rounded-[15px] px-6 my-10 py-10 w-[calc(100%-32px)] sm:w-[calc(100%-80px)] md:w-fit md:px-24 relative flex justify-center border-2 border-secondary/5">
                    <div className="flex flex-col justify-start items-center w-full md:w-[350px]">
                        {errors.formInstructions ? (
                            <p
                                className="text-error font-normal border-l-2 border-error pl-[15px] mb-10 text-base">
                                {errors.formInstructions}
                            </p>
                        ) : null}
                        {/* icone de usuario */}
                        <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full border-2 border-secondary/20">
                            <HiOutlineMail className="text-secondary text-2xl" />
                        </div>
                        {/* titulo do modal */}
                        <ModalTitle className="mt-4">Bem vindo !</ModalTitle>
                        <p className="font-medium text-xl text-text mt-[10px]">Crie sua conta</p>
                        {/* Botão de login com google */}
                        <GoogleAuthButton onClick={googleSignIn} />
                        {/* Renderiza o erro passado pelo contexto caso houver, se não, renderiza o erro do registerSchema */}
                        {errors.googleAuth ? (
                            <p
                                className="text-error font-normal mt-[10px] text-base">{errors.googleAuth}
                            </p>
                        ) : null}
                        {/* separador */}
                        <div className="my-[25px] w-full relative before:w-full before:h-px before:rounded-xl before:bg-secondary/10 before:absolute flex items-center justify-center before:-z-10">
                            <p className="px-3 bg-surface text-sm">OU</p>
                        </div>
                        {/* titulo para o formulario de registro */}
                        <h3 className="font-bold text-lg text-secondary mb-[25px]">Criar com email</h3>
                        <RegisterForm 
                            registerUser={handleFormSubmit} 
                            isUserCreatingAccount={isUserCreatingAnAccount}
                            authErrors={errors}
                            isModalActive={isRegisterModalActive}
                        />
                        {/* Botão de fechamento do modal */}
                        { isRegisterModalActive && <CloseButton onClick={closeModal} />}
                    </div>
                </div>

                {/* Overlay */}
                <div className="w-screen h-lvh fixed top-0 left-0 bg-background/85"></div>
            </div>
        </>
    );
};