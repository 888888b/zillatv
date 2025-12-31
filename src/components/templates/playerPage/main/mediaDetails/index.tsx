import { TmdbMediaProps } from '@/app/[lang]/types';
import { useRef, useEffect, useCallback } from 'react';
// traduções
import titleTranslations from '@/i18n/translations/sections/translations.json';
import buttonTranslations from '@/i18n/translations/buttons/translations.json';
import './styles.css';
// tipos
import { LangCode } from '@/i18n/languages';
type ComponentProps = {
    mediaData: TmdbMediaProps;
    mediaType: 'serie' | 'movie' | 'tv';
    className?: string;
    updateMediaImgHeight: (height: number) => void;
    lang: string;
};

export default function ContentDetails({
    mediaData, mediaType, className, updateMediaImgHeight, lang
}: ComponentProps) {
    const seeEpisodesBtnRef = useRef<HTMLAnchorElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    const titlesText = titleTranslations[lang as LangCode];
    const buttonsText = buttonTranslations[lang as LangCode];

    // obtem a nota do publico sobre o conteudo
    const getImdbReviews = (vote_average: number, vote_count: number) => {
        const reviewsCount = vote_count >= 1000 ?
            `${(vote_count / 1000).toFixed(0)}k`
            :
            `${vote_count} ${titlesText.review}`
        return `${vote_average.toFixed(1)} (${reviewsCount})`;
    };
    // --------------------------------------------------------------------
    // Obtem o orçamento do filme/serie
    const handleBudgetAndRevenue = (value: number): string => {
        if (value < 1000000000) {
            if (value < 1000000) {
                if (value < 1000) {
                    if (value > 0) return `${value} ${titlesText.dollars}`;
                    return titlesText.not_available;
                };

                const division = parseInt((value / 1000).toFixed(0));
                return `${division} ${titlesText.thousand_dollars}`;
            };

            const division = parseInt((value / 1000000).toFixed(0));
            return `${division} ${titlesText.million_dollars}`;

        } else {
            if (value > 0) {
                const division = parseInt((value / 1000000000).toString()[0]);
                const rest = parseInt((value % 1000000000).toString()[0]);
                return `${[division, rest].join('.')} ${titlesText.billion_dollars}`;
            };
        };
        return titlesText.not_available;
    };
    // --------------------------------------------------------------------
    // Obtem o nome dos produtores do filme/serie
    const getContentProducers = (crew: TmdbMediaProps[]): string => {
        const producers = crew.filter(people => people.job === 'Producer');
        if (!producers.length) return titlesText.not_available;
        return producers.map(producer => producer.name).join(', ');
    };
    // --------------------------------------------------------------------
    // retorma o novo do criador da serie
    const getContentCreator = (creators: TmdbMediaProps[]): string => {
        if (!creators || !creators.length) return titlesText.not_available;
        return creators.map(creator => creator.name).join(', ');
    };
    // --------------------------------------------------------------------
    // retorna uma lista com todos os paises envolvidos na produção do filme/serie
    const getProductionCountries = (
        countriesList: Record<string, (string | number)>[]): string => {
        if (!countriesList) return titlesText.not_available;
        return countriesList.map(country => (country.name)).join(', ');
    };
    // --------------------------------------------------------------------
    // retorna uma lista com todos as produtoras envolvidas na produção do filme/serie
    const getProductionCompanies = (
        companiesList: Record<string, (string | number)>[]): string => {
        if (!companiesList) return titlesText.not_available;
        return companiesList.map(company => (company.name)).join(', ');
    };
    // --------------------------------------------------------------------
    // retorna uma lista com todos os generos do filme/serie
    const getGenres = (
        genresList: Record<string, (string | number)>[]): string => {
        if (!genresList) return titlesText.not_available;
        return genresList.map(genre => (genre.name)).join(', ');
    };
    // retorna uma data no formato xx-xx-xxxx para x day de xx mes do ano xxxx
    function formatDateToLong(date: string): string {
        const months = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];
        if (lang === 'pt-BR') {
            const [year, month, day] = date.split("-");
            const monthIndex = parseInt(month, 10) - 1;
            return `${parseInt(day)} de ${months[monthIndex]} de ${year}`;
        };
        return new Date(date).toLocaleDateString(lang, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
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
        return () => { window.removeEventListener('resize', onViewportResize) };
    }, [onViewportResize]);

    return (
        <div className={`details-wrapper ${className}`}>
            <ul className="details-list" ref={listRef}>
                {/* Avaliação */}
                <li className="list-item">
                    <span>{titlesText.review}</span>
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
                        <span>{titlesText.seasons}</span>
                        {mediaData.number_of_seasons}
                    </li>
                )}
                {/* Gêneros */}
                {mediaData.genres && (
                    <li className="list-item">
                        <span>{titlesText.genres}</span> {
                            getGenres(mediaData.genres)}
                    </li>
                )}
                {/* Duração */}
                {mediaType === 'movie' && (
                    <li className="list-item">
                        <span>{titlesText.duration}</span>
                        {mediaData.runtime} min
                    </li>
                )}
                {/* ir para o carousel de episodios */}
                <li className="hidden lg:[display:initial] go-to-episodes">
                    <a
                        ref={seeEpisodesBtnRef}
                        href={mediaType === 'movie' ? '#similar-movies' : '#episodes-carousel'}
                        className="w-full rounded-(--radius-button) bg-secondary/5 h-12 flex justify-center items-center 
                        text-[clamp(1.0625rem,1.15vw,1.125rem)] font-medium text-secondary/90">
                        {mediaType === 'movie' ? buttonsText.view_similar : buttonsText.view_episodes}
                    </a>
                </li>
                {/* Lançamento */}
                <li className="list-item">
                    <span>{titlesText.released_date}</span>{' '}
                    {formatDateToLong(mediaData.release_date ?? mediaData.first_air_date)}
                </li>
                {/* Episódios */}
                {(mediaType === 'serie' || mediaType === 'tv') && (
                    <li className="list-item">
                        <span>{titlesText.number__of_episodes}</span>
                        {mediaData.number_of_episodes}
                    </li>
                )}
                {/* Criador da série */}
                {(mediaType === 'serie' || mediaType === 'tv') && mediaData.created_by ? (
                    <li className="list-item">
                        <span>{titlesText.creator}</span>
                        {getContentCreator(mediaData.created_by)}
                    </li>
                ) : null}
                {/* Direção */}
                {mediaData.credits.crew && (
                    <li className="list-item">
                        <span>{titlesText.direction}</span>
                        {getContentProducers(mediaData.credits.crew)}
                    </li>
                )}
                {/* Produtoras */}
                {mediaData.production_companies && (
                    <li className="list-item">
                        <span>{titlesText.Production_companies}</span> {getProductionCompanies(mediaData.production_companies)}
                    </li>
                )}
                {/* País de produção */}
                {mediaData.production_countries && (
                    <li className="list-item">
                        <span>{titlesText.production_country}</span> {getProductionCountries(mediaData.production_countries)}
                    </li>
                )}
                {/* Orçamento */}
                {mediaType === 'movie' && mediaData.budget ? (
                    <li className="list-item">
                        <span>{titlesText.box_office}</span>
                        {handleBudgetAndRevenue(mediaData.budget)}
                    </li>
                ) : null}
                {/* Bilheteria */}
                {mediaType === 'movie' && mediaData.revenue ? (
                    <li className="list-item">
                        <span>{titlesText.box_office}</span>
                        {handleBudgetAndRevenue(mediaData.revenue)}
                    </li>
                ) : null}
            </ul>
        </div>
    );
};