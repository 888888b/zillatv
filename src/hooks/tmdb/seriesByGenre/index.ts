import { FetchReturn } from "../types";

// Busca series com base no genero fornecido
export const fetchSeriesByGenre = async (
    genre: string,
    lang: string = 'pt-BR',
    page: number = 1
): Promise<FetchReturn | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${token}&language=${lang}&with_genres=${genre}&include_image_language=${region},en,null&page=${page}`, {
            cache: page === 1 ? 'force-cache' : 'no-store',
            next: { revalidate: page === 1 && 14400 } // 4 horas
        });

        if (!res.ok) {
            throw new Error(`Erro ao buscar series do genero ${genre}: ${res.status}`);
        };

        const data = await res.json();
        return { pages: data.total_pages, results: data.results };

    } catch (err) {
        console.error(err);
    };
};