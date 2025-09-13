type ComponentProps = {
    description: string | undefined;
    className?: string;
};

export const Description = (props: ComponentProps) => {
    const { description, className } = props;

    return (
        <p className={`[font-size:clamp(1.125rem,1.3vw,1.25rem)] overflow-ellipsis text-center line-clamp-2 sm:line-clamp-3 sm:max-w-[50%] sm:text-left lg:max-w-[40%] 2xl:line-clamp-4 ${className}`}>
            {description ?
                description :
                'A sinopse deste conteúdo não está disponível no momento'}
        </p>
    );
};

export default Description;