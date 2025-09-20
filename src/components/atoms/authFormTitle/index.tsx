type ComponentProps = { children: string, className?: string };

export const FormTitle = (props: ComponentProps) => {
    const { children, className } = props;
    return (
        <h3 className={`font-bold [font-size:clamp(1.125rem,1.3vw,1.25rem)] text-secondary ${className}`}>
            {children}
        </h3>
    )
};