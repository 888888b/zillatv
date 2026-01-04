import { FetchReturn } from "../types";

// busca filmes lançamentos com base na data fornecida
export const fetchReleasedMovies = async (
    lang: string = 'pt-BR',
    page: number = 1
): Promise<FetchReturn | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const newDate = new Date().toISOString().split('T')[0];
    const region = lang.split('-')[0];
    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${token}&primary_release_date.gte=${newDate}&sort=primary_release_date.desc&language=${lang}&include_image_language=${region},en,null&page=${page}`, {
            cache: 'force-cache',
            next: { revalidate: 18000 }
        });

        if (!res.ok) {
            throw new Error(`Erro ao buscar filmes lançamentos: ${res.status}`);
        };

        const data = await res.json();
        return { pages: data.total_pages, results: data.results };

    } catch (err) {
        console.error(err);
    };
};