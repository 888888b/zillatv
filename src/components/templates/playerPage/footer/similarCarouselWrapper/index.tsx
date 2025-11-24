import useTmdb from '@/hooks/tmdb';
// componentes
import SimilarsCarousel from '../similarCarousel';
// funções utilitarias
import { checkAvailability } from "@/utils/tmdb/checkAvailability";
// tipo
type ComponentProps = { 
    movieId: string;
    className?: string;
    lang: string;
};

export default async function SimilarsCarouselWrapper({
    movieId, className, lang
}: ComponentProps) {
    const { fetchSimilarMovies } = useTmdb();
    const langCode = [lang.split('-')[0], lang.split('-')[1].toUpperCase()].join('-')
    const similars = await fetchSimilarMovies(movieId, langCode);
    const filtered = await checkAvailability(similars);
    const carouselData = [...filtered];
    return (
        <SimilarsCarousel 
            data={carouselData} 
            className={className}
            lang={lang}
        />
    );
};