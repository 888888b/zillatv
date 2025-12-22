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
            className={`w-fit text-[clamp(1.1875rem,3vw,1.375rem)] font-bold font-raleway text-secondary cursor-pointer transition-colors duration-300 lg:text-[clamp(1.375rem,1.6vw,1.5625rem)] 2xl:text-[clamp(1.5625rem,1.6vw,2rem)] ${className}`}
            >
            { children }
        </h2>
    );
};