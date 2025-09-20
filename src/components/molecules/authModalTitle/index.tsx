type ComponentProps = {
    className?: string;
    title: string;
    subtitle?: string;
};

export const ModalTitle = (props: ComponentProps) => {
    const { className, title, subtitle } = props;

    return (
        <>
            <h2 className={`[font-size:clamp(2.25rem,2.4vw,2.375rem)] font-raleway font-extrabold text-secondary line-clamp-2 truncate ${className}`}>
                {title}
            </h2>

            {subtitle &&
                <p className="font-medium [font-size:clamp(1.25rem,1.4vw,1.375rem)]">
                    {subtitle}
                </p>
            }
        </>
    );
};