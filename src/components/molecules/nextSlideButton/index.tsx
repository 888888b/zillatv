import { ComponentPropsWithRef } from "react";
import { ArrowRight } from "@/components/atoms/arrowRightIcon";

type ComponentProps = ComponentPropsWithRef<'button'>;

export default function NextSlideButton( props: ComponentProps ) {
    const { className, ...rest } = props;

    return (
        <button
            {...rest}
            className={`w-[1.5rem,1.65vw,1.625rem] aspect-square hover:scale-110 rounded-full z-30 cursor-pointer items-center justify-center hidden md:flex outline-none border-none bg-primary opacity-50 hover:opacity-100 transition-all duration-150 ${className}`}>
            <ArrowRight color="var(--color-background)" width={24} height={24} stroke="1.7" />
        </button>
    );
};