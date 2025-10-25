import { ReactNode } from "react";
type ComponentProps = { className?: string, children: ReactNode }

const Genres = (props: ComponentProps) => {
    const { className, children } = props;
    return (
        <p className={`[font-size:clamp(1rem,1.15vw,1.125rem)] line-clamp-1 overflow-ellipsis sm:max-w-[40%] lg:max-w-[30%] md:hover:max-w-none ${className}`}>{children}</p>
    );
};
export default Genres;