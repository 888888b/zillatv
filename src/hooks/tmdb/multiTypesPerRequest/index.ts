import { TmdbMediaProps } from "@/app/[lang]/types";

export const fetchMultiTypes = async (
    keyword: string,
    lang: string = 'pt-BR',
    page: string = '1'
): Promise<TmdbMediaProps[] | undefined> => {
    const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${keyword}&api_key=${api_key}&include_adult=false&language=${lang}&page=${page}&include_image_language=${region},en,null`);
        if (response.ok) {
            return (await response.json()).results;
        };

    } catch (err) {
        console.error(err);
    };
};