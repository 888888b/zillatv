import { ReactNode } from "react";
type ComponentProps = { className?: string, children: ReactNode }

const Title = (props: ComponentProps) => {
    const {className, children} = props;
    return (
        <h1 className={`[font-size:clamp(2.5rem,5vw,5rem)] text-center sm:text-left font-black font-raleway text-secondary line-clamp-2 sm:line-clamp-1 sm:max-w-[80%] xl:max-w-[60%] uppercase ${className}`}>{children}</h1>
    );
};
export default Title;