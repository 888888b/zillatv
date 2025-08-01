import { tmdbObjProps } from "@/contexts/tmdbContext";

import './styles.css';

type ComponentProps = {
    mediaData: tmdbObjProps;
    mediaType: string;
    className?: string;
};

export default function ContentDetails(props: ComponentProps) {
    const { mediaData, mediaType, className } = props;

    // obtem a nota do publico sobre o conteudo
    const getImdbReviews = (vote_average: number, vote_count: number) => {
        return `${vote_average.toFixed(1)} (${vote_count} Avaliações)`;
    };
    // --------------------------------------------------------------------
    // Obtem o orçamento do filme/serie
    const handleBudgetAndRevenue = (value: number): string => {
        if (value < 1000000000) {
            if (value < 1000000) {
                if (value < 1000) {
                    if (value > 0) return `${value} dolares`;
                    return 'Valor não disponivel';
                };

                const division = parseInt((value / 1000).toFixed(0));
                return `${division} mil dolares`;
            };

            const division = parseInt((value / 1000000).toFixed(0));
            return `${division} milhões de dolares`;

        } else {
            if (value > 0) {
                const division = parseInt((value / 1000000000).toString()[0]);
                const rest = parseInt((value % 1000000000).toString()[0]);
                return `${[division, rest].join('.')} bilhões de dolares`;
            };
        };
        return 'Valor não disponivel';
    };
    // --------------------------------------------------------------------
    // Obtem o tempo de duração do filme 
    const getRunTime = (runtime: number | null): string => {
        if (!runtime || runtime === 0) return 'Duração não disponivel';
        if (runtime < 60) return `${runtime}m`;
        const hours = (runtime / 60).toFixed(0);
        const minites = runtime % 60;
        return `${hours}h ${minites}m`;
    };
    // --------------------------------------------------------------------
    // Obtem o nome dos produtores do filme/serie
    const getContentProducers = (crew: tmdbObjProps[]): string => {
        const producers = crew.filter(people => people.job === 'Producer');
        if (!producers.length) return 'Informação não disponivel';
        return producers.map(producer => producer.name).join(', ');
    };
    // --------------------------------------------------------------------
    // retorma o novo do criador da serie
    const getContentCreator = (creators: tmdbObjProps[]): string => {
        if (!creators || !creators.length) return 'Informação não disponivel';
        return creators.map(creator => creator.name).join(', ');
    };
    // --------------------------------------------------------------------
    // retorna uma lista com todos os paises envolvidos na produção do filme/serie
    const getProductionCountries = (
        countriesList: Record<string, (string | number)>[]): string => {
        if (!countriesList) return 'Informação não disponivel';
        return countriesList.map(country => (country.name)).join(', ');
    };
    // --------------------------------------------------------------------
    // retorna uma lista com todos as produtoras envolvidas na produção do filme/serie
    const getProductionCompanies = (
        companiesList: Record<string, (string | number)>[]): string => {
        if (!companiesList) return 'Informação não disponivel';
        return companiesList.map(company => (company.name)).join(', ');
    };
    // --------------------------------------------------------------------
    // retorna uma lista com todos os generos do filme/serie
    const getGenres = (
        genresList: Record<string, (string | number)>[]): string => {
        if (!genresList) return 'Informação não disponivel';
        return genresList.map(genre => (genre.name)).join(', ');
    };
    // retorna uma data no formato xx-xx-xxxx para x day de xx mes do ano xxxx
    function formatDateToLong(dateString: string): string {
        const months = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];
        const [year, month, day] = dateString.split("-");
        const monthIndex = parseInt(month, 10) - 1;
        return `${parseInt(day)} de ${months[monthIndex]} de ${year}`;
    };

    return (
        <div className={`details-wrapper ${className}`}>
            {/* Coluna 1 de informações */}
            <dl>
                {/* Nota do público ao conteúdo */}
                {(mediaData.vote_average || mediaData.vote_count) &&
                    <div className="list-item">
                        <dt>IMDb:</dt>
                        <dd>{getImdbReviews(mediaData.vote_average, mediaData.vote_count)}</dd>
                    </div>
                }

                {/* Gêneros */}
                {mediaData.genres &&
                    <div className="list-item">
                        <dt>Gêneros:</dt>
                        <dd>{getGenres(mediaData.genres)}</dd>
                    </div>
                }

                {/* Criador da série */}
                {mediaType === 'serie' ? (
                    <div className="list-item">
                        <dt>Criador:</dt>
                        <dd>{getContentCreator(mediaData.created_by)}</dd>
                    </div>
                ) : null}

                {/* Direção */}
                {mediaData.credits.crew &&
                    <div className="list-item">
                        <dt>Direção:</dt>
                        <dd>{getContentProducers(mediaData.credits.crew)}</dd>
                    </div>
                }

                {/* Lançamento */}
                {(mediaData.release_date || mediaData.first_air_date) &&
                    <div className="list-item">
                        <dt>Data de lançamento:</dt>
                        <dd>{formatDateToLong(mediaData.release_date ?? mediaData.first_air_date)}</dd>
                    </div>
                }

                {/* Orçamento */}
                {mediaType === 'movie' ? (
                    <div className="list-item">
                        <dt>Orçamento:</dt>
                        <dd>{handleBudgetAndRevenue(mediaData.budget)}</dd>
                    </div>
                ) : null}
            </dl>

            {/* Coluna 2 de informações */}
            <dl>
                {/* Bilheteria */}
                {mediaType === 'movie' ? (
                    <div className="list-item">
                        <dt>Bilheteria:</dt>
                        <dd>{handleBudgetAndRevenue(mediaData.revenue)}</dd>
                    </div>
                ) : null}

                {/* País de produção */}
                {mediaData.production_countries &&
                    <div className="list-item">
                        <dt>País de produção:</dt>
                        <dd>{getProductionCountries(mediaData.production_countries)}</dd>
                    </div>
                }

                {/* Produtora(s) */}
                {mediaData.production_companies &&
                    <div className="list-item">
                        <dt>Produtora(s):</dt>
                        <dd>
                            {getProductionCompanies(mediaData.production_companies)}
                        </dd>
                    </div>
                }

                {/* Duração */}
                {mediaType === 'movie' &&
                    <div className="list-item">
                        <dt>Duração:</dt>
                        <dd>{getRunTime(mediaData.runtime)}</dd>
                    </div>
                }

                {/* Temporadas */}
                {mediaType === 'serie' &&
                    <div className="list-item">
                        <dt>Número de temporadas:</dt>
                        <dd>{mediaData.number_of_seasons}</dd>
                    </div>
                }

                {/* Episódios */}
                {mediaType === 'serie' &&
                    <div className="list-item">
                        <dt>Número de episódios:</dt>
                        <dd>{mediaData.number_of_episodes}</dd>
                    </div>
                }
            </dl>
        </div>
    );
};