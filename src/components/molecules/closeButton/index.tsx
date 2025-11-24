import { ComponentPropsWithRef } from "react";
import { CloseIcon } from "../../atoms/closeIcon";

type ComponentProps = ComponentPropsWithRef<'button'>;

export const CloseButton = (props: ComponentProps) => {
    const { className, ...rest } = props;

    return (
        <button
            {...rest}
            className={`bg-primary w-[35px] h-[35px] rounded-full flex items-center justify-center absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 cursor-pointer border-none outline-none md:bg-primary/70 hover:bg-primary transition-all hover:scale-110 duration-300 text-accent ${className}`}>
            <CloseIcon stroke={0.8} className="w-6 h-6" />
        </button>
    );
};