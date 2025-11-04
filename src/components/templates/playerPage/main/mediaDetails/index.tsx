import { TmdbMediaProps } from '@/app/types';
import { useRef, useEffect, useCallback } from 'react';

import './styles.css';

type ComponentProps = {
    mediaData: TmdbMediaProps;
    mediaType: 'serie' | 'movie' | 'tv';
    className?: string;
    updateMediaImgHeight: (height: number) => void;
};

export default function ContentDetails(props: ComponentProps) {
    const { mediaData, mediaType, className, updateMediaImgHeight } = props;
    const seeEpisodesBtnRef = useRef<HTMLAnchorElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    // obtem a nota do publico sobre o conteudo
    const getImdbReviews = (vote_average: number, vote_count: number) => {
        const reviewsCount = vote_count >= 1000 ?
            `${(vote_count / 1000).toFixed(0)}k`
            :
            `${vote_count} Avaliações`
        return `${vote_average.toFixed(1)} (${reviewsCount})`;
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
    const getContentProducers = (crew: TmdbMediaProps[]): string => {
        const producers = crew.filter(people => people.job === 'Producer');
        if (!producers.length) return 'Informação não disponivel';
        return producers.map(producer => producer.name).join(', ');
    };
    // --------------------------------------------------------------------
    // retorma o novo do criador da serie
    const getContentCreator = (creators: TmdbMediaProps[]): string => {
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

    const onViewportResize = useCallback(() => {
        const episodesBtn = seeEpisodesBtnRef.current;
        const list = listRef.current;
        if (!episodesBtn || !list) return;
        const btnCoordenates = episodesBtn.getBoundingClientRect();
        const listCoordenates = list.getBoundingClientRect();
        const mediaImgHeight = Number((btnCoordenates.top - listCoordenates.top + 60 - 24 + 32).toFixed(0));
        updateMediaImgHeight(mediaImgHeight);
    }, [seeEpisodesBtnRef, listRef, updateMediaImgHeight]);

    useEffect(() => {
        onViewportResize();
        if (!window) return;
        window.addEventListener('resize', onViewportResize);
        return () => {window.removeEventListener('resize', onViewportResize)};
    }, [onViewportResize]);

    return (
        <div className={`details-wrapper ${className}`}>
            <ul className="details-list" ref={listRef}>
                {/* Avaliação */}
                <li className="list-item">
                    <span>Review</span>
                    <div className="flex items-center flex-wrap gap-x-2">
                        <img
                            src="/IMDB_icon.png"
                            alt="Icone do IMDB"
                            className="h-[clamp(2.5rem,2.75vw,2.75rem)]"
                        />
                        {getImdbReviews(mediaData.vote_average, mediaData.vote_count)}</div>
                </li>
                {/* Temporadas */}
                {(mediaType === 'serie' || mediaType === 'tv') && (
                    <li className="list-item">
                        <span>Temporadas</span>
                        {mediaData.number_of_seasons}
                    </li>
                )}
                {/* Gêneros */}
                {mediaData.genres && (
                    <li className="list-item">
                        <span>Gêneros</span> {
                            getGenres(mediaData.genres)}
                    </li>
                )}
                {/* Duração */}
                {mediaType === 'movie' && (
                    <li className="list-item">
                        <span>Duração</span>
                        {getRunTime(mediaData.runtime)}
                    </li>
                )}
                {/* ir para o carousel de episodios */}
                <li className="hidden lg:[display:initial] go-to-episodes">
                    <a 
                        ref={seeEpisodesBtnRef} 
                        href={mediaType === 'movie' ? '#similar-movies' : '#episodes-carousel'} 
                        className="w-full rounded-md bg-secondary/10 h-12 flex justify-center items-center [font-size:clamp(1.0625rem,1.15vw,1.125rem)] font-medium text-secondary/90">
                        { mediaType === 'movie' ? 'Ver similares' : 'Ver episódios' }
                    </a>
                </li>
                {/* Lançamento */}
                <li className="list-item">
                    <span>Lançamento</span>{' '}
                    {formatDateToLong(mediaData.release_date ?? mediaData.first_air_date)}
                </li>
                {/* Episódios */}
                {(mediaType === 'serie' || mediaType === 'tv') && (
                    <li className="list-item">
                        <span>Número de episódios</span>
                        {mediaData.number_of_episodes}
                    </li>
                )}
                {/* Criador da série */}
                {(mediaType === 'serie' || mediaType === 'tv') && mediaData.created_by ? (
                    <li className="list-item">
                        <span>Criador</span>
                        {getContentCreator(mediaData.created_by)}
                    </li>
                ) : null}
                {/* Direção */}
                {mediaData.credits.crew && (
                    <li className="list-item">
                        <span>Direção</span>
                        {getContentProducers(mediaData.credits.crew)}
                    </li>
                )}
                {/* Produtoras */}
                {mediaData.production_companies && (
                    <li className="list-item">
                        <span>Produtoras</span> {getProductionCompanies(mediaData.production_companies)}
                    </li>
                )}
                {/* País de produção */}
                {mediaData.production_countries && (
                    <li className="list-item">
                        <span>País de produção</span> {getProductionCountries(mediaData.production_countries)}
                    </li>
                )}
                {/* Orçamento */}
                {mediaType === 'movie' && mediaData.budget ? (
                    <li className="list-item">
                        <span>Orçamento</span>
                        {handleBudgetAndRevenue(mediaData.budget)}
                    </li>
                ) : null}
                {/* Bilheteria */}
                {mediaType === 'movie' && mediaData.revenue ? (
                    <li className="list-item">
                        <span>Bilheteria</span>
                        {handleBudgetAndRevenue(mediaData.revenue)}
                    </li>
                ) : null}
            </ul>
        </div>
    );
};