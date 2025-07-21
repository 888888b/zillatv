type ComponentProps = {
    className?: string;
    children: string;
};

export const ModalTitle = ( props: ComponentProps ) => {
    const { className, children } = props;

    return (
        <h2 
            className={`text-4xl font-raleway font-extrabold text-secondary line-clamp-2 truncate ${className}`}>
            {children}
        </h2>
    );
};