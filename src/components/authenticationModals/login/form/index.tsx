// hooks
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

// Ferramentas de validação
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// contexto
import { GlobalEventsContext } from "@/contexts/globalEventsContext";

const loginSchema = z.object({
    email: z.string()
        .min(1, 'Campo obrigatório')
        .max(40, 'Limite de caracteres atingido')
        .refine(value => /^[^\s@]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(value), {
        message: 'Informe um email vàlido'
        })
        .refine(value => /^[a-zA-Z0-9@.]+$/.test(value), {
        message: 'Evite caracteres especiais'
        }),

    password: z.string()
        .min(8, 'Campo obrigatório')
        .max(10, 'Limite de caracteres atingido')
        .refine(value => /^[a-zA-Z0-9@.]+$/.test(value), {
            message: 'Evite caracteres especiais'
        }),
});

export type LoginProps = z.infer<typeof loginSchema>

type componentProps = {
    authenticateUser: ( schemaData: LoginProps ) => void;
}

export default function LoginForm( props: componentProps ) {
    
    const globalContext = useContext( GlobalEventsContext );
    const authErrors = globalContext.errors;

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors }
    }  = useForm<LoginProps>({
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        reset();
    },[ globalContext.isLoginModalActive ]);

    return (
        <form onSubmit={handleSubmit(props.authenticateUser)} className="flex flex-col">
            <label htmlFor="" className="text-base font-medium">E-mail*</label>
            <input 
                type="text" 
                placeholder="Email cadastrado" 
                { ...register('email') }
                maxLength={41}
                className="font-medium placeholder:font-normal border border-transparent outline-none text-base placeholder:text-neutral-400 mt-2 bg-richblack rounded-md h-12 px-3"
                style={{
                    borderColor: errors.password || authErrors.login ? 'orangered' : 'transparent'
                }}
            />

            {/* Renderiza o erro passado pelo contexto caso houver, se não, renderiza o erro do loginSchema */}
            { authErrors.login ? (
                <p 
                    className="text-orangered font-medium mt-1 text-base max-[620px]:static">{authErrors.login}
                </p>
            ) : (
                <>
                    { errors.email?.message && (
                        <p 
                            className="text-orangered font-medium mt-1 text-base max-[620px]:static">{errors.email.message}
                        </p>
                    )}
                </>   
            )}

            <label htmlFor="" className="text-base font-medium mt-4">Senha*</label>
            <input 
                type="password" 
                placeholder="Senha de acesso"
                { ...register('password') } 
                maxLength={11}
                className="font-medium placeholder:font-normal text-base placeholder:text-neutral-400 border-transparent mt-2 bg-richblack rounded-md h-12 px-3 border outline-none"
                style={{
                    borderColor: errors.password || authErrors.login ? 'orangered' : 'transparent'
                }}
            />

            {/* Renderiza o erro passado pelo contexto caso houver, se não, renderiza o erro do loginSchema */}
            { authErrors.login ? (
                <p 
                    className="text-orangered font-medium mt-1 text-base max-[620px]:static">{authErrors.login}
                </p>
            ) : (
                <>
                    { errors.password?.message && (
                        <p className="text-orangered font-medium mt-1 text-base max-[620px]:static">{errors.password.message}</p>
                    )}
                </>   
            )}

            <button 
                className="mt-6 w-full rounded-md bg-darkslateblue flex items-center justify-center h-12 font-semibold border-none outline-none btn hover:bg-darkslateblue text-white"
                style={{ 
                    backgroundColor: !globalContext.isUserLoggingIntoAccount ? 'darkslateblue' : 'rgba(72, 61, 139, 0.4)',
                    fontSize: !globalContext.isUserLoggingIntoAccount ? '16px' : '17px'
                }}
            >
                { globalContext.isUserLoggingIntoAccount ? (
                    <>
                        Conectando
                        <span className="loading loading-bars loading-md"></span>
                    </>
                ) : (
                    <>
                        Acessar conta                    
                    </>
                )}
            </button>
        </form>
    );
};