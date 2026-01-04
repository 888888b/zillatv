import { FetchReturn } from "../types";
// Busca filmes com base no genero fornecido
export const fetchMoviesByGenre = async (
    genre: string,
    lang: string = 'pt-BR',
    page: number = 1
): Promise<FetchReturn | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${token}&with_genres=${genre}&language=${lang}&include_image_language=${region},en,null&page=${page}`, {
            cache: 'force-cache',
            next: { revalidate: 14400 } // 4 horas
        });

        if (!res.ok) {
            throw new Error(`Erro ao buscar filmes em alta: ${res.status}`);
        };

        const data = await res.json();
        return { pages: data.total_pages, results: data.results };

    } catch (err) {
        console.error(err);
    };
};