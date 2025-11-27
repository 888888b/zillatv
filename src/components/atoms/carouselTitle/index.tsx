import { HTMLAttributes, ReactNode } from "react";

type ElementProps = {
    children: ReactNode
} & HTMLAttributes<HTMLElement>;

export const CarouselTitle = ( props: ElementProps ) => {
    const {
        children, 
        className, 
        ...rest 
    } = props;

    return (
        <h2 
            { ...rest } 
            className={`w-fit [font-size:clamp(1.1875rem,3vw,1.375rem)] font-black font-raleway text-secondary hover:text-primary cursor-pointer transition-colors duration-300 lg:[font-size:clamp(1.375rem,1.4vw,1.5rem)] ${className}`}
            >
            { children }
        </h2>
    );
};