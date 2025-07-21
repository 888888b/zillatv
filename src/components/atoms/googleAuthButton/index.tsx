import { ComponentPropsWithRef } from "react";
import { FcGoogle } from "react-icons/fc";

type ComponentProps = ComponentPropsWithRef<'button'>;

export const GoogleAuthButton = (props: ComponentProps) => {
    const { className, ...rest } = props;

    return (
        <button
            {...rest}
            className={`w-full max-w-[350px] h-12 rounded-lg mt-10 bg-secondary text-accent text-base font-medium px-5 flex items-center gap-x-5 border-none outline-none justify-start transition-transform active:scale-95 duration-200 cursor-pointer ${className}`}>
            <FcGoogle className="text-2xl" />
            Continuar com o Google
        </button>
    );
};