// hooks
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// Ferramentas de validação
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// tipos
import { ErrorMessages } from "@/contexts/globalEventsContext";

const loginSchema = z.object({
    email: z.string()
        .min(1, 'Campo obrigatório !')
        .max(40, 'Limite de caracteres atingido')
        .refine(value => /^[^\s@]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(value), {
            message: 'Informe um email vàlido'
        })
        .refine(value => /^[a-zA-Z0-9@.]+$/.test(value), {
            message: 'Evite caracteres especiais'
        }),

    password: z.string()
        .min(8, 'Campo obrigatório !')
        .max(10, 'Limite de caracteres atingido')
        .refine(value => /^[a-zA-Z0-9@.]+$/.test(value), {
            message: 'Evite caracteres especiais'
        }),
});

export type LoginProps = z.infer<typeof loginSchema>

type componentProps = {
    authenticateUser: (schemaData: LoginProps) => void;
    authErrors: ErrorMessages;
    isModalActive: boolean;
    isUserLogginIn: boolean;
};

export default function LoginForm(props: componentProps) {

    const { 
        authenticateUser, 
        authErrors, 
        isModalActive,
        isUserLogginIn
    } = props;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<LoginProps>({
        mode: 'onChange',
        criteriaMode: 'all',
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        reset();
    }, [isModalActive]);

    return isModalActive ? (
        // formulario de login
        <form onSubmit={handleSubmit(authenticateUser)} className="flex flex-col w-full">
            {/* pegar email */}
            <input
                type="email"
                placeholder="Email"
                className="w-full font-medium text-base placeholder:text-text bg-secondary/10 rounded-lg h-12 px-[15px] border outline-none text-secondary mt-[15px]"
                maxLength={41}
                {...register('email')}
                style={{
                    borderColor: errors.email ? 'var(--color-error)' : 'transparent',
                    backgroundColor: errors.email ? 'rgba(255, 0, 0, 0.1)' : ''
                }}
            />

            {/* erro de validaçao | email */}
            {errors.email?.message && (
                <p
                    className="text-error font-normal mt-[10px] text-base">
                    {errors.email.message}
                </p>
            )}

            <input
                type="password"
                placeholder="Senha"
                className="w-full font-medium text-base placeholder:text-text bg-secondary/10 rounded-lg h-12 px-[15px] border outline-none text-secondary mt-[15px]"
                {...register('password')}
                maxLength={11}
                style={{
                    borderColor: errors.password ? 'var(--color-error)' : 'transparent',
                    backgroundColor: errors.password ? 'rgba(255, 0, 0, 0.1)' : ''
                }}
            />

            {/* erro de validaçao | password */}
            {errors.password?.message && (
                <p className="text-error font-normal mt-[10px] text-base">
                    {errors.password.message}
                </p>
            )}

            {/* Renderiza o erro passado pelo contexto caso houver, se não, renderiza o erro do loginSchema */}
            {authErrors.login && (
                <p className="text-error font-normal mt-[10px] text-base">
                    {authErrors.login}
                </p>
            )}

            <button
                className="mt-[25px] w-full rounded-lg flex items-center justify-center h-12 font-semibold border-none outline-none transition-all duration-200 active:scale-95 text-accent gap-x-5 bg-primary/70 cursor-pointer"
                type="submit"
                style={{
                    backgroundColor: isValid ? 'var(--color-primary)' : '',
                    color: isValid ? 'var(--color-accent)' : ''
                }}>
                {isUserLogginIn ? (
                    <>
                        Acessando conta
                        <span className="loading loading-dots loading-md"></span>
                    </>
                ) : (
                    <>
                        Entrar
                    </>
                )}
            </button>
        </form>
    ) : null;
};