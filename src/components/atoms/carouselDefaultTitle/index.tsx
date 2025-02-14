import { HTMLAttributes, ReactNode } from "react";

type ElementProps = {
    children: ReactNode
} & HTMLAttributes<HTMLElement>;

export const CarouselDefaultTitle = ( props: ElementProps ) => {
    const { 
        children, 
        className, 
        ...rest 
    } = props;

    return (
        <h2 
            { ...rest } 
            className={`font-raleway text-lg lg:text-[20px] font-semibold ${className}`}
            >
            { children }
        </h2>
    );
};