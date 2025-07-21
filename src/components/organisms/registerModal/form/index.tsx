// Hooks
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// Ferramentas de validação
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// tipos
import { ErrorMessages } from "@/contexts/globalEventsContext";

export const registerSchema = z.object({
    name: z.string()
        .min(3, 'Campo obrigatório !')
        .max(30, 'Limite de caracteres atingido')
        .refine(value => /^[a-zA-Z\s^ãõç]+$/.test(value), {
            message: 'Evite numeros ou caracteres especiais'
        }),

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

export type RegisterProps = z.infer<typeof registerSchema>;

type componentProps = {
    registerUser: (schemaData: RegisterProps) => void;
    authErrors: ErrorMessages;
    isUserCreatingAccount: boolean;
    isModalActive: boolean;
};

export default function RegisterForm(props: componentProps) {

    const { 
        authErrors, 
        registerUser, 
        isUserCreatingAccount, 
        isModalActive 
    } = props;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<RegisterProps>({
        mode: 'onChange',
        criteriaMode: 'all',
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        reset();
    }, [isModalActive]);

    return isModalActive ? (
        // formulario de inscrição
        <form onSubmit={handleSubmit(registerUser)} className="flex flex-col w-full">
            {/* pegar nome */}
            <input
                type="text"
                placeholder="Nome"
                className="w-full font-medium text-base placeholder:text-text bg-secondary/10 rounded-lg h-12 px-[15px] border outline-none text-secondary"
                {...register('name')}
                maxLength={31}
                style={{
                    borderColor: errors.name ? 'var(--color-error)' : 'transparent',
                    backgroundColor: errors.name ? 'rgba(255, 0, 0, 0.1)' : ''
                }}
            />
            {/* erro de digitação caso houver */}
            {errors.name?.message && (
                <p className="text-error font-normal text-base mt-[10px]">{errors.name.message}</p>
            )}

            {/* pegar email */}
            <input
                type="email"
                placeholder="Email"
                className="w-full font-medium text-base placeholder:text-text bg-secondary/10 rounded-lg h-12 px-[15px] border outline-none text-secondary mt-[15px]"
                maxLength={41}
                {...register('email')}
                style={{
                    borderColor: errors.email || authErrors.register ? 'var(--color-error)' : 'transparent',
                    backgroundColor: errors.email || authErrors.register ? 'rgba(255, 0, 0, 0.1)' : ''
                }}
            />

            {/* Renderiza o erro passado pelo contexto caso houver, se não, renderiza o erro do registerSchema */}
            {authErrors.register ? (
                <p className="text-error font-normal mt-[10px] text-base">
                    {authErrors.register}
                </p>
            ) : (
                <>
                    {errors.email?.message && (
                        <p
                            className="text-error font-normal mt-[10px] text-base">
                            {errors.email.message}
                        </p>
                    )}
                </>
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


            {errors.password?.message && (
                <p className="text-error font-normal mt-[10px] text-base">
                    {errors.password.message}
                </p>
            )}

            <button
                className="mt-[25px] w-full rounded-lg flex items-center justify-center h-12 font-semibold border-none outline-none transition-all duration-200 active:scale-95 text-accent gap-x-5 bg-primary/70 cursor-pointer"
                type="submit"
                style={{
                    backgroundColor: isValid ? 'var(--color-primary)' : '',
                    color: isValid ? 'var(--color-accent)' : ''
                }}>
                {isUserCreatingAccount ? (
                    <>
                        Criando conta
                        <span className="loading loading-dots loading-md"></span>
                    </>
                ) : (
                    <>
                        Criar conta
                    </>
                )}
            </button>
        </form>
    ) : null;
};