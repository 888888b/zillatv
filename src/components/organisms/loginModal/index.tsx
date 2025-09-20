'use client';
// hooks
import {
    useEffect,
    useRef,
    useContext,
    useCallback
} from "react";
import useFirebase from "@/hooks/firebase";
// contextos
import { GlobalEventsContext } from "@/contexts/globalEventsContext";
// icones
import { RiUser6Line } from "react-icons/ri";
// componentes
import LoginForm from './form';
import { CloseButton } from "@/components/atoms/closeButton";
import { GoogleAuthButton } from "@/components/atoms/googleAuthButton";
import { ModalTitle } from "@/components/molecules/authModalTitle";
import { InputErrorMsg } from "@/components/atoms/inputErrorMessage";
import { FormLineSeparator } from "@/components/atoms/authModalFormSeparator";
import { FormTitle } from "@/components/atoms/authFormTitle";
// utilitarios
import { resetAuthErrors } from "@/utils/firebase/resetAuthErrors";
// tipos
import { LoginProps } from "./form";
export type ErrorMessage = 'formInstructions' | 'googleAuth' | 'login' | 'register';

export default function LoginModal() {
    // ações do usuario
    const {
        authenticateUser,
        signInWithGoogle,
    } = useFirebase();
    // controle do modal de login
    const {
        isLoginModalActive,
        dispatch,
        errors,
        isUserLoggingIntoAccount
    } = useContext(GlobalEventsContext);
    // ref do input que controla o modal
    const checkboxInputRef = useRef<HTMLInputElement | null>(null);

    // Simula um click para o input que exibe/esconde o modal de regitro
    const checkboxToggle = (): void => {
        const el = checkboxInputRef.current;
        if (!el) return;
        el.checked = isLoginModalActive;
    };

    useEffect(() => {
        checkboxToggle();
    }, [isLoginModalActive]);

    // Tenta authenticar o usuario, se for sucesso, atualiza os dados do usuario dentro do contexto e fecha o modal
    const handleFormSubmit = useCallback((data: LoginProps) => {
        const email = data.email.trimEnd();
        const password = data.password.trimEnd();
        authenticateUser(email, password, 'login');
    }, [authenticateUser]);

    // fecha o modal | reseta qualquer mensagem de erro
    const closeModal = useCallback((): void => {
        resetAuthErrors(errors, dispatch);
        dispatch({ type: 'IS_LOGIN_MODAL_ACTIVE', payload: false });
    }, [dispatch, errors]);

    const googleSignIn = useCallback((): void => {
        signInWithGoogle('login');
    }, [signInWithGoogle]);

    return (
        <>
            <input type="checkbox" ref={checkboxInputRef} id="my_modal_6" className="modal-toggle" />
            <div className="modal" style={{ overflowY: 'visible', transition: 'all 0s linear' }} role="dialog">
                {/* Conteudo do modal */}
                <div className="z-50 bg-surface rounded-[10px] px-5 my-10 py-10 w-[calc(100%-32px)] sm:min-w-[500px] sm:w-fit sm:px-24 relative flex justify-center border-2 border-secondary/5">
                    <div className="flex flex-col justify-start items-center w-[clamp(300px,28vw,400px)]">
                        {errors.formInstructions && (
                            <InputErrorMsg className="border-l-2 border-error pl-4 mb-10">
                                {errors.formInstructions}  
                            </InputErrorMsg>
                        )}
                        {/* icone de usuario */}
                        <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full border-2 border-secondary/20 [font-size:clamp(1rem,1.15vw,1.125rem)]">
                            <RiUser6Line className="text-secondary [font-size:1.5em]" />
                        </div>
                        {/* titulo do modal */}
                        <ModalTitle className="mt-4" title="Bem vindo !" subtitle="Acesse sua conta"/>
                        {/* Botão de login com google */}
                        <GoogleAuthButton onClick={googleSignIn} className="mt-10" />
                        {/* Renderiza o erro passado pelo contexto caso houver, se não, renderiza o erro do loginSchema */}
                        {errors.googleAuth && (
                            <InputErrorMsg className="mt-2">{errors.googleAuth}</InputErrorMsg>
                        )}
                        {/* separador */}
                        <div className="my-6 w-full relative before:w-full before:h-px before:rounded-xl before:bg-secondary/10 before:absolute flex items-center justify-center before:-z-10">
                            <FormLineSeparator/>
                        </div>
                        {/* titulo para o formulario de login */}
                        <FormTitle className="mb-6">Entrar com email</FormTitle>
                        <LoginForm
                            authenticateUser={handleFormSubmit}
                            authErrors={errors}
                            isModalActive={isLoginModalActive}
                            isUserLogginIn={isUserLoggingIntoAccount}
                        />
                        {/* Botão de fechamento do modal */}
                        {isLoginModalActive && <CloseButton onClick={closeModal} />}
                    </div>
                </div>
                {/* Overlay */}
                <div className="w-screen h-lvh fixed top-0 left-0 bg-background/85"></div>
            </div>
        </>
    );
};