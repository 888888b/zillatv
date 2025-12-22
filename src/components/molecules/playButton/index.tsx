import { ComponentPropsWithRef, memo } from "react";

const PlayButton = memo(( props: ComponentPropsWithRef<'button'> ) => {
    const { className, children, ...rest } = props;
    return (
        <button
            {...rest}
            className={`text-[clamp(0.875rem,1.15vw,1.0625rem)] h-[clamp(2.5rem,4.7vw,3rem)] pointer-events-auto outline-none border-none 
            w-fit rounded-(--radius-button) bg-primary text-background font-extrabold px-[1.5em] active:scale-95 transition-all 
            duration-200 flex items-center gap-1.5 justify-center cursor-pointer uppercase hover:opacity-70 ${className}`}>
            {children}
        </button>
    );
});

PlayButton.displayName = 'PlayButton';
export default PlayButton;