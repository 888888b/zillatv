type ComponentProps = {
    children?: string
    mediaType: string
};

export default function children( props: ComponentProps ) {
    const { mediaType, children } = props;

    return (
        <div className="font-raleway">
            {/* // caso exista um valor de pesquisa / nao exista */}
            <>
                <p className='font-semibold text-base leading-6 md:text-lg uppercase lg:leading-[27px]' style={{letterSpacing: '0.05em'}}>
                    {children ? 'Exibindo resultados para' : 'Exibindo'}
                </p>

                <h2 className=" leading-9 text-secondary font-black text-4xl md:leading-11 xl:text-5xl xl:leading-[60px] line-clamp-2 truncate max-w-[550px]">
                    {children ? 
                    children 
                    : 
                    `Top ${mediaType === 'movie' ? 'filmes' : 'series'}`
                    }
                </h2>
            </>
        </div>
    );
};