import { ReactNode } from "react";
type ComponentProps = { 
    className?: string; 
    children: ReactNode;
};

const Description = ({children, className}: ComponentProps) => {
    return (
        <p className={`text-[clamp(1rem,1.42vw,1.125rem)] xl:text-[clamp(1.125rem,1.25vw,1.25rem)] overflow-ellipsis text-center line-clamp-2 lg:line-clamp-3 sm:max-w-[50%] sm:text-left lg:max-w-[40%] ${className}`}>
        {children}
        </p>
    );
}
export default Description;