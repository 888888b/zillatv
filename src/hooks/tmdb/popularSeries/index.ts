import { TmdbMediaProps } from "@/app/types";

// busca series populares entre os usuarios do TMDB
export const fetchPopularSeries = async (
    lang: string = 'pt-BR',
    page: string = '1'
): Promise<TmdbMediaProps[] | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${token}&include_adult=false&language=${lang}&page=${page}&sort_by=vote_average.desc&vote_count.gte=200&include_image_language=${region},en,null`);
        if (response.ok) {
            return (await response.json()).results;
        };

    } catch (err) {
        console.error(err);
    };
};