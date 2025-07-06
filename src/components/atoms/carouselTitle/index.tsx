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
            className={`text-[19px] font-black font-raleway md:text-[22px] tracking-wide text-secondary flex items-center justify-between md:justify-start gap-x-[10px] flex-nowrap hover:text-primary cursor-pointer transition-colors duration-300 w-fit ${className}`}
            >
            { children }
            <ArrowRight stroke="2" width={24} height={24}/>
        </h2>
    );
};