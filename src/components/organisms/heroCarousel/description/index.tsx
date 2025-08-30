type ComponentProps = {
    description: string | undefined;
    className?: string;
};

export const Description = (props: ComponentProps) => {
    const { description, className } = props;

    return (
        <p className={`overflow-ellipsis leading-6 text-center line-clamp-2 sm:line-clamp-3 sm:max-w-[50%] sm:text-left text-lg lg:leading-7 lg:max-w-[40%] ${className}`}>
            {description ?
                description :
                'A sinopse deste conteúdo não está disponível no momento'}
        </p>
    );
};

export default Description;