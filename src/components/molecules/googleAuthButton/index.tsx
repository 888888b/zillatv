import { ComponentPropsWithRef } from "react";
import { FcGoogle } from "react-icons/fc";

type ComponentProps = ComponentPropsWithRef<'button'>;

export const GoogleAuthButton = (props: ComponentProps) => {
    const { className, ...rest } = props;

    return (
        <button
            {...rest}
            className={`w-full h-12 rounded-md bg-secondary text-background [font-size:clamp(1rem,1.15vw,1.125rem)] font-medium px-5 flex items-center gap-x-5 border-none outline-none justify-start transition-transform active:scale-95 duration-200 cursor-pointer whitespace-nowrap ${className}`}>
            <FcGoogle className="[font-size:1.5em]" />
            Continuar com o Google
        </button>
    );
};