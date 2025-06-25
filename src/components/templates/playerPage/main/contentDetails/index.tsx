import { tmdbObjProps } from "@/contexts/tmdbContext";

import './styles.css';

type ComponentProps = {
    contentData: tmdbObjProps;
    contentType: string;
};

export default function ContentDetails( props: ComponentProps ) {

    const contentData = props.contentData;

    // obtem a nota do publico sobre o conteudo
    const getImdbReviews = ( vote_average: number, vote_count: number ) => {
        return `${vote_average.toFixed( 1 )} (${ vote_count } Avaliações)`;
    };

    // --------------------------------------------------------------------

    // Obtem o orçamento do filme/serie
    const handleBudgetAndRevenue = ( value: number ) => {
        if ( value < 1000000000 ) {
            if ( value < 1000000 ){
                if ( value < 1000 ) {
                    if ( value > 0 ) return `${ value } dolares`;
                    return 'Valor não disponivel';
                };
        
                const division = parseInt(( value / 1000 ).toFixed(0));
                return `${ division } mil dolares`;
            };

            const division = parseInt(( value / 1000000 ).toFixed(0));
            return `${ division } milhões de dolares`;

        } else {
            if ( value > 0 ) {
                const division = parseInt(( value / 1000000000 ).toString()[0]);
                const rest = parseInt(( value % 1000000000 ).toString()[0]);
                return `${[ division, rest ].join('.')} bilhões de dolares`;
            };
        };

        return 'Valor não disponivel';
    };

    // --------------------------------------------------------------------

    // Obtem o tempo de duração do filme 
    const getRunTime = ( runtime: number | null ) => {
        if ( !runtime || runtime === 0 ) {
            return 'Duração não disponivel';
        };

        if ( runtime < 60 ) {
            return `${ runtime }m`;
        };

        const hours = ( runtime / 60 ).toFixed(0);
        const minites = runtime % 60;

        return `${ hours }h ${ minites }m`;
    };

    // --------------------------------------------------------------------

    // Obtem o nome dos produtores do filme/serie
    const getContentProducers = ( crew: tmdbObjProps[] ) => {
        const producers = crew.filter( people => people.job === 'Producer');

        if ( !producers.length ) {
            return 'Informação não disponivel';
        };

        return producers.map( producer => producer.name).join(', ');
    };

    // --------------------------------------------------------------------

    const getContentCreator = ( creators: tmdbObjProps[] ) => {
        if ( !creators || !creators.length ) {
            return 'Informação não disponivel';
        };

        creators.map( creator => creator.name ).join(', ');
    };

    // --------------------------------------------------------------------

    const getProductionCountries = ( countriesList: Record<string, (string | number)>[] ) => {
        if ( !countriesList ) {
            return 'Informação não disponivel';
        };

        return countriesList.map( country => (country.name)).join(', ');
    };

    return (
        <div className="details-wrapper">
            {/* Coluna 1 de informações*/}
            <div>
                {/* Nota do publico ao conteudo */}
                <p className='text-[17px] lg:text-lg font-medium rounded'>
                    <span className="mr-[6px]">Imdb: </span>
                    <span className='text-neutral-400 font-normal'>
                        {getImdbReviews( contentData.vote_average, contentData.vote_count )}
                    </span>
                </p>

                {/* Generos */}
                <p className="text-[17px] lg:text-lg font-medium rounded">
                    <span className="mr-[6px]">Gêneros:</span>

                    <span className="text-neutral-400 font-normal">
                        { contentData.genres.map(( genre: Record<string, (string | number)> ) => genre.name ).join(', ')}
                    </span>
                </p>

                {/* Criador da serie */}
                { props.contentType === 'serie' ? (
                    <p className="text-[17px] lg:text-lg font-medium rounded">
                        <span className="mr-[6px]">Criador:</span>

                        <span className="text-neutral-400 font-normal ">
                            {getContentCreator( contentData.created_by )}
                        </span>
                    </p>
                ) : null }

                {/* Direção */}
                <p className="text-[17px] lg:text-lg font-medium rounded">
                    <span className="mr-[6px]">Direção:</span>

                    <span className="text-neutral-400 font-normal ">
                        {getContentProducers( contentData.credits.crew )}
                    </span>
                </p>

                {/* Lançamento */}
                <p className="text-[17px] lg:text-lg font-medium rounded">
                    <span className="mr-[6px]">Data de lançamento:</span>

                    <span className="text-neutral-400 font-normal ">
                        { contentData.release_date ?? contentData.first_air_date }
                    </span>
                </p>

                {/* Orçamento */}
                { props.contentType === 'movie' ? (
                    <p className="text-[17px] lg:text-lg font-medium rounded">
                        <span className="mr-[6px]">Orçamento:</span>

                        <span className="text-neutral-400 font-normal ">
                            {handleBudgetAndRevenue( contentData.budget )}
                        </span>
                    </p>
                ) : null }
            </div>

            {/* Coluna 2 de informações */}
            <div>

                {/* Bilheteria */}
                { props.contentType === 'movie' ? (
                    <p className="text-[17px] lg:text-lg font-medium rounded">
                        <span className="mr-[6px]">Bilheteria:</span>

                        <span className="text-neutral-400 font-normal ">
                            {handleBudgetAndRevenue( contentData.revenue )}
                        </span>
                    </p>
                ) : null }

                {/* Pais de produção */}
                <p className="text-[17px] lg:text-lg font-medium rounded">
                    <span className="mr-[6px]">Pais de produção:</span>

                    <span className="text-neutral-400 font-normal ">
                        {getProductionCountries(contentData.production_countries)}
                    </span>
                </p>

                {/* Empresa de produção */}
                <p className="text-[17px] lg:text-lg font-medium rounded">
                    <span className="mr-[6px]">Produtora(s):</span>

                    <span className="text-neutral-400 font-normal ">
                        { contentData.production_companies.map(( company: Record<string, (string | number)> ) => company.name ).join(', ')}
                    </span>
                </p>

                {/* Duração */}
                { props.contentType === 'movie' ? (
                    <p className="text-[17px] lg:text-lg font-medium rounded">
                        <span className="mr-[6px]">Duração:</span>
                        <span className="whitespace-nowrap text-[17px] lg:text-lg font-normal text-neutral-400">
                            {getRunTime( contentData.runtime )}
                        </span>
                    </p>
                ) : null }

                {/* Temporadas */}
                { props.contentType === 'serie' ? (
                    <p className="text-[17px] lg:text-lg font-medium rounded">
                        <span className="mr-[6px]">Numero de temporadas:</span>

                        <span className="text-neutral-400 font-normal ">
                            { contentData.number_of_seasons }
                        </span>
                    </p>
                ) : null }

                {/* Episodios */}
                { props.contentType === 'serie' ? (
                    <p className="text-[17px] lg:text-lg font-medium rounded">
                        <span className="mr-[6px]">Numero de episódios:</span>
                        <span className="text-neutral-400 font-normal ">
                            { contentData.number_of_episodes }
                        </span>
                    </p>
                ) : null }
            </div>
        </div>
    );
};