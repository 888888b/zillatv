import { FetchReturn } from "../types";

export const fetchTrendingMovies = async (
    lang: string = 'pt-BR',
    page: number = 1
): Promise<FetchReturn | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];

    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${token}&language=${lang}&include_image_language=${region},en,null&page=${page}`, {
            cache: 'force-cache',
            next: { revalidate: 3600 } // 1 hora
        });
        
        if (!res.ok) {
            throw new Error(`Erro ao buscar filmes em alta: ${res.status}`);
        };

        const data = await res.json();
        return { pages: data.total_pages, results: data.results };

    } catch (err) {
        console.error('Erro ao buscar filmes em alta' + err);
    };
};