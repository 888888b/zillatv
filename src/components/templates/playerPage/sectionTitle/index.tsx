import { ReactNode } from "react";

type ComponentProps = {
    children: ReactNode;
    className?: string;
};

export const SectionTitle = (props: ComponentProps) => {
    const {children, className} = props;

    return (
        <h2 className={`text-[19px] leading-6 font-black font-raleway md:text-[22px] md:leading-7 tracking-wide text-secondary cursor-pointer transition-colors duration-300 w-full sm:w-fit ${className}`}>{children}</h2>
    );
};