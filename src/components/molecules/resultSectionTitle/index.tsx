type ComponentProps = {
    children?: string
    mediaType: string
};

export default function children( props: ComponentProps ) {
    const { mediaType, children } = props;

    return (
        <>
            {
                 children ? (
                    <>
                        <p className='text-text font-raleway font-semibold text-base md:text-lg'>
                            Todos os resultados para
                        </p>

                        <h2 className="text-3xl text-secondary font-raleway font-extrabold md:text-4xl xl:text-5xl line-clamp-2 truncate leading-[1.25] max-w-[550px]">
                            {children}
                        </h2>
                    </>
                ) : (
                    <>
                        <p className='text-text font-raleway font-semibold text-base md:text-lg'>
                                Exibindo
                            </p>
                        <h2 className="text-2xl font-raleway md:text-4xl font-bold xl:text-5xl">
                            Top {mediaType === 'movie' ? 'filmes' : 'series'}
                        </h2>
                    </>
                )
            }
        </>
    );
};