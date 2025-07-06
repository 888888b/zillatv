import { ComponentPropsWithRef } from "react";
import { ArrowRight } from "@/components/atoms/arrowRightIcon";

type ComponentProps = ComponentPropsWithRef<'button'>;

export default function NextSlideButton( props: ComponentProps ) {
    const { className, ...rest } = props;

    return (
        <button
            {...rest}
            className={`w-6 h-6 hover:scale-110 duration-300 transition-all  rounded-full z-30 cursor-pointer items-center justify-center hidden md:flex outline-none border-none ${className}`}>
            <ArrowRight color="#333333" width={24} height={24} stroke="1.7" />
        </button>
    );
};