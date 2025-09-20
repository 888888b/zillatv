// hooks
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
    authErrors: ErrorMessages;
    isModalActive: boolean;
    isUserLogginIn: boolean;
    authenticateUser: (schemaData: LoginProps) => void;
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

    return isModalActive && (
        // formulario de login
        <form onSubmit={handleSubmit(authenticateUser)} className="flex flex-col items-center w-full">
            {/* campo de email */}
            <AuthInput
                type="email"
                placeholder="Email"
                maxLength={41}
                {...register('email')}
                style={{
                    borderColor: errors.email && 'var(--color-error)',
                    backgroundColor: errors.email && 'color-mix(in oklab, var(--color-error) 10%, transparent)'
                }}
            />
            {/* erro de validaçao | email */}
            {errors.email?.message && (
                <InputErrorMsg className="mt-2">{errors.email.message}</InputErrorMsg>
            )}
            {/* campo de senha */}
            <AuthInput
                type="password"
                placeholder="Senha"
                className="mt-4"
                {...register('password')}
                maxLength={11}
                style={{
                    borderColor: errors.password && 'var(--color-error)',
                    backgroundColor: errors.password && 'color-mix(in oklab, var(--color-error) 10%, transparent)'
                }}
            />
            {/* erro de validaçao | email */}
            {errors.password?.message && 
                <InputErrorMsg className="mt-2">{errors.password.message}</InputErrorMsg>}
            {/* erro de auth | email */}
            {authErrors.login && <InputErrorMsg className="mt-2">{authErrors.login}</InputErrorMsg>}            

            <SubmitButton 
                onLoadingText="Acessando conta" 
                isUserLogginIn={isUserLogginIn}
                isValid={isValid}
                className="mt-6">
                Entrar
            </SubmitButton>
        </form>
    );
};