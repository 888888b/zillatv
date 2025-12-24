import { TmdbMediaProps } from "@/app/[lang]/types";

export const fetchTrendingMovies = async (
    lang: string = 'pt-BR',
    page: number = 1
): Promise<TmdbMediaProps[] | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];

    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${token}&language=${lang}&include_image_language=${region},en,null&page=${page}`, {
            cache: 'force-cache',
            next: { revalidate: 43200 }
        });
        if (response.ok) {
            return (await response.json()).results;
        };
    } catch (err) {
        console.error('Erro ao buscar filmes em alta' + err);
    };
};