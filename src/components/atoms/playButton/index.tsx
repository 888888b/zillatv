import { ComponentPropsWithRef, memo } from "react";

const PlayButton = memo(( props: ComponentPropsWithRef<'button'> ) => {
    const { className, children, ...rest } = props;
    return (
        <button
            {...rest}
            className={`[font-size:clamp(1rem,1.15vw,1.125rem)] h-[clamp(2.5rem,4.7vw,3rem)] pointer-events-auto outline-none border-none w-fit rounded-md bg-primary text-background font-bold px-[1.5em] active:scale-95 transition-transform duration-200 flex items-center gap-x-3 justify-center cursor-pointer ${className}`}>
            {children}
        </button>
    );
});

PlayButton.displayName = 'PlayButton';
export default PlayButton;