type ComponentProps = {
    searchTerm: string | undefined
    contentType: string
};

export default function SectionTitle( props: ComponentProps ) {
    const { contentType, searchTerm } = props;

    return (
        <>
            {
                 searchTerm ? (
                    <>
                        <p className='text-white/70 font-raleway font-semibold text-base md:text-lg'>
                            Todos os resultados para
                        </p>
                        <h2 className="text-2xl font-raleway font-bold md:text-4xl xl:text-5xl">
                            {searchTerm}
                        </h2>
                    </>
                ) : (
                    <>
                        <p className='text-white/70 font-raleway font-semibold text-base md:text-lg'>
                                Exibindo
                            </p>
                        <h2 className="text-2xl font-raleway md:text-4xl font-bold xl:text-5xl">
                            Top {contentType === 'movie' ? 'filmes' : 'series'}
                        </h2>
                    </>
                )
            }
            < div className = 'w-full h-px bg-white/20 rounded-3xl mb-7 mt-7' ></div >
        </>
    );
};