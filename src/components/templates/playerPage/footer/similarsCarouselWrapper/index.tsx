import useTmdb from '@/hooks/tmdb';
// componentes
import SimilarsCarousel from '../similarsCarousel';
// funções utilitarias
import { checkAvailability } from "@/utils/tmdbApiData/availability";
// tipo
type ComponentProps = { movieId: string, className?: string };

export default async function SimilarsCarouselWrapper(props: ComponentProps) {
    const { movieId, className } = props;
    const { fetchSimilarMovies } = useTmdb();
    const similars = await fetchSimilarMovies(movieId);
    const filtered = await checkAvailability(similars);
    const carouselData = [...filtered];
    return <SimilarsCarousel data={carouselData} className={className}/>
};