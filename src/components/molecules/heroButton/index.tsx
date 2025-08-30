import { ComponentPropsWithRef, memo } from "react";

const HeroButton = memo(( props: ComponentPropsWithRef<'button'> ) => {
    const { className, children, ...rest } = props;

    return (
        <button
            {...rest}
            className={`pointer-events-auto outline-none border-none w-fit h-10 rounded-md bg-primary text-background text-base font-bold px-6  active:scale-95 transition-transform duration-200 flex items-center gap-x-3 justify-center cursor-pointer lg:h-12 ${className}`}>
            {children}
        </button>
    );
});

HeroButton.displayName = 'HeroButton';
export default HeroButton;