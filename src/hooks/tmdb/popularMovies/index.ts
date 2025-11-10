import { TmdbMediaProps } from "@/app/[lang]/types";

// busca filmes populares entre os usuarios do TMDB
export const fetchPopularMovies = async (
    lang: string = 'pt-BR',
    page: string = '1'
): Promise<TmdbMediaProps[] | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?&api_key=${token}&include_adult&include_video&language=${lang}&page=${page}&sort_by=popularity.desc&include_image_language=${region},en,null`);
        if (response.ok) {
            return (await response.json()).results;
        };
    } catch (err) {
        console.error(err);
    };
};