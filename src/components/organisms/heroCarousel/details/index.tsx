// utilitarios
import { getReleaseDate } from "@/utils/tmdbApiData/releaseDate";
import { getRunTime } from "@/utils/tmdbApiData/runtime";
// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
type ComponentProps = { slide: tmdbObjProps, className?: string };

export default function DetailsBar(props: ComponentProps) {
    const { slide, className } = props;

    const getImdbReviews = (imdb: number, votes: number): string => {
        if (!imdb) return `IMDB: 76,8% (123)`
        return `IMDB: ${(imdb * 10).toFixed(1)}% (${votes ?? 123})`;
    };

    return (
        <ul className={`text-lg text-secondary font-semibold flex-row gap-6 flex-nowrap overflow-hidden *:whitespace-nowrap ${className}`}>
            {/* aprovação do publico */}
            <li className="text-primary">{getImdbReviews(slide.vote_average, slide.vote_count)}</li>
            {/* tempo de duração */}
            {slide.runtime && <li>{getRunTime(slide.runtime)}</li>}
            {/* data de lançamento */}
            <li>{getReleaseDate(slide.release_date ?? slide.first_air_date)}</li>
            {/* numero de temporadas */}
            {slide.number_of_seasons && <li>{slide.number_of_seasons} Temporada(s)</li>}
            
        </ul>
    );
};