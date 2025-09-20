type ComponentProps = { className?: string, children: string };

export const InputErrorMsg = (props: ComponentProps) => {
    const { className, children } = props;
    return (
        <p className={`text-error font-normal [font-size:clamp(1rem,1.15vw,1.125rem)] w-full text-left ${className}`}>
            {children}
        </p>
    );
};