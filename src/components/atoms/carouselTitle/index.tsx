import { HTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "../arrowRightIcon";

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
            className={`[font-size:clamp(1.1875rem,3vw,1.375rem)] font-black font-raleway text-secondary flex items-center gap-x-[10px] flex-nowrap hover:text-primary cursor-pointer transition-colors duration-300 lg:[font-size:clamp(1.375rem,1.4vw,1.5rem)] uppercase ${className}`}
            >
            { children }
            <ArrowRight stroke="2" width={24} height={24}/>
        </h2>
    );
};