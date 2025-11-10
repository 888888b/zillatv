import { TmdbMediaProps } from "@/app/[lang]/types";

// busca filmes similares ao escolhido pelo usuario
export const fetchSimilarMovies = async (
    movieId: string,
    lang: string = 'pt-BR'
): Promise<TmdbMediaProps[] | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${token}&language=${lang}&page=1&include_image_language=${region},en,null`);
        if (response.ok) {
            return (await response.json()).results;
        };

    } catch (err) {
        console.error(err);
    };
};