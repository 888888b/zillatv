import { ComponentPropsWithRef, ReactNode } from "react";
type ComponentProps = ComponentPropsWithRef<'input'>

export const AuthInput = (props: ComponentProps) => {
    const { className, ...rest } = props;
    return (
        <input
            {...rest}
            className={`w-full font-medium [font-size:clamp(1rem,1.15vw,1.125rem)] placeholder:text-text bg-secondary/10 rounded-md h-12 px-4 border outline-none text-secondary border-transparent ${className}`}
        />
    );
};