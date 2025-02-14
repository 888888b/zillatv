import { ReactNode, HTMLAttributes } from "react";

type ElementProps = {
    children: ReactNode
} & HTMLAttributes<HTMLElement>;

export const CarouselFeatureTitle = ( props: ElementProps ) => {
    const { 
        children, 
        className, 
        ...rest 
    } = props;

    return (
        <h2 
            { ...rest } 
            className={`font-raleway text-3xl lg:text-[40px] leading-10 uppercase font-bold ${className}`}
            >
            { children }
        </h2>
    );
};