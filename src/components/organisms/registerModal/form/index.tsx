// Hooks
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// Ferramentas de validação
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// componentes
import { InputErrorMsg } from "@/components/atoms/inputErrorMessage";
import { AuthInput } from "@/components/atoms/authFormInput";
import { SubmitButton } from "@/components/atoms/authFormSubmitButton";
// tipos
import { ErrorMessages } from "@/contexts/auth";

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

    return isModalActive && (
        // formulario de inscrição
        <form onSubmit={handleSubmit(registerUser)} className="flex flex-col items-center w-full">
            {/* campo de nome */}
            <AuthInput
                type="text"
                placeholder="Nome"
                {...register('name')}
                maxLength={31}
                style={{
                    borderColor: errors.name && 'var(--color-error)',
                    backgroundColor: errors.name && 'color-mix(in oklab, var(--color-error) 10%, transparent)'
                }}
            />
            {/* erro de validaçao | nome */}
            {errors.name?.message && (
                <InputErrorMsg className="mt-2">{errors.name.message}</InputErrorMsg>
            )}
            {/* campo de email */}
            <AuthInput
                type="email"
                placeholder="Email"
                className='mt-4'
                maxLength={41}
                {...register('email')}
                style={{
                    borderColor: (errors.email || authErrors.register) && 'var(--color-error)',
                    backgroundColor: (errors.email || authErrors.register) && 'color-mix(in oklab, var(--color-error) 10%, transparent)'
                }}
            />
            {/* erro de validaçao | email */}
            {errors.email?.message && (
                <InputErrorMsg className="mt-2">{errors.email.message}</InputErrorMsg>
            )}
            {/* erro de auth | email */}
            {authErrors.register && (
                <InputErrorMsg className="mt-2">{authErrors.register}</InputErrorMsg>
            )}
            {/* campor de senha */}
            <AuthInput
                type="password"
                placeholder="Senha"
                className="mt-4"
                {...register('password')}
                maxLength={11}
                style={{
                    borderColor: errors.password ? 'var(--color-error)' : 'transparent',
                    backgroundColor: errors.password ? 'rgba(255, 0, 0, 0.1)' : ''
                }}
            />
            {/* erro de validaçao | auth */}
            {errors.password?.message && (
                <InputErrorMsg className="mt-2">{errors.password.message}</InputErrorMsg> 
            )}
            <SubmitButton 
                onLoadingText="Criando conta"
                isValid={isValid}
                isUserLogginIn={isUserCreatingAccount}
                className="mt-6">
                Criar conta
            </SubmitButton>
        </form>
    );
};