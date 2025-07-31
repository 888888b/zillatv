import { ComponentPropsWithRef, memo } from "react";

const HeroButton = memo(( props: ComponentPropsWithRef<'button'> ) => {
    const { className, children, ...rest } = props;

    return (
        <button
            {...rest}
            className={`pointer-events-auto outline-none border-none w-full max-w-[500px] h-12 rounded-[10px] uppercase bg-primary text-primary-content text-sm lg:text-[15px] font-bold sm:w-48 lg:w-52 active:scale-95 transition-transform duration-200 flex items-center gap-x-3 justify-center cursor-pointer ${className}`}>
            {children}
        </button>
    );
});

HeroButton.displayName = 'HeroButton';
export default HeroButton;