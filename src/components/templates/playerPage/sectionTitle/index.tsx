import { ReactNode } from "react";

type ComponentProps = {
    children: ReactNode;
    className?: string;
};

export const SectionTitle = (props: ComponentProps) => {
    const {children, className} = props;

    return (
        <h2 className={`[font-size:clamp(1.1875rem,3vw,1.375rem)] font-black font-raleway text-secondary cursor-pointer transition-colors duration-300 w-full sm:w-fit lg:[font-size:clamp(1.375rem,1.4vw,1.5rem)] ${className}`}>{children}</h2>
    );
};