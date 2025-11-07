// hooks
import useTmdbFetch from "@/hooks/tmdb";
import useLanguage from '@/hooks/lang';
// traduções
import translations from '@/i18n/translations/sections/translations.json';
// componentes
import MoviesSeriesCarousel from "@/components/organisms/moviesSeriesCarousel";
import SectionTitle from "../../sectionTitle";
// funções utilitarias
import { checkAvailability } from "@/utils/tmdbApiData/availability";
// tipos
import { TmdbMediaProps } from "@/app/types";
type carouselProps = { movieId: string, className?: string };

export default async function FetchCarouselData(props: carouselProps) {
    const moviesList: TmdbMediaProps[] = [];
    const { movieId, className } = props;
    const { fetchSimilarMovies } = useTmdbFetch();
    const movies = await fetchSimilarMovies(movieId)
    const lang = useLanguage().language.code;
    const text = translations[lang];

    if (movies) {
        const filteredMovies = await checkAvailability(movies);
        moviesList.push(...filteredMovies);
    };

    return moviesList ? (
        <div className={`flex flex-col gap-y-6 page-max-width relative ${className}`}>
            <div id='similar-movies' className="absolute -top-[116px] left-0"/>
            <SectionTitle className="page-padding text-left">
                {text.similar_movies}
            </SectionTitle>
            <MoviesSeriesCarousel slidesData={moviesList} slidesType="movie" />
        </div>
    ) : null;
}; 