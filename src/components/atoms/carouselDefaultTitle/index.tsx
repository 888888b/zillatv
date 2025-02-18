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
            className={`font-raleway text-[20px] md:text-xl lg:text-2xl font-bold mb-3 ${className}`}
            >
            { children }
        </h2>
    );
};