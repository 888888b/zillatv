import { FetchReturn } from "../types";

export const fetchMultiTypes = async (
    keyword: string,
    lang: string = 'pt-BR',
    page: number = 1
): Promise<FetchReturn | undefined> => {
    const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const language = lang.split('-')[0];
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(keyword)}&api_key=${api_key}&include_adult=true&language=${lang}&include_image_language=${language},en,null&page=${page}`, {
            cache: 'no-store',
        });
        
        if (!res.ok) {
            throw new Error(`Erro ao buscar filmes populares: ${res.status}`);
        };

        const data = await res.json();
        return { pages: data.total_pages, results: data.results };

    } catch (err) {
        console.error(err);
    };
};