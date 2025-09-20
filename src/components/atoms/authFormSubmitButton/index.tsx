type ComponentProps = {
    isValid: boolean;
    isUserLogginIn: boolean;
    children: string;
    onLoadingText: string;
    className?: string;
};

export const SubmitButton = (props: ComponentProps) => {
    const { 
        isUserLogginIn, 
        isValid, 
        children,
        onLoadingText,
        className
    } = props;
    return (
        <button
            className={`w-full rounded-md flex items-center justify-center h-12 font-semibold border-none outline-none transition-all duration-200 active:scale-95 text-background gap-x-5 bg-primary/70 cursor-pointer [font-size:clamp(1rem,1.15vw,1.125rem)] ${className}`}
            type="submit"
            style={{
                backgroundColor: isValid ? 'var(--color-primary)' : '',
                color: isValid ? 'var(--color-accent)' : ''
            }}>
            <>
                {isUserLogginIn ? onLoadingText : children}
                {isUserLogginIn && <span className="loading loading-dots loading-md"></span>}
            </>
        </button>
    )
};