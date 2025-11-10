import { TmdbMediaProps } from "@/app/[lang]/types";

// Busca series com base no genero fornecido
export const fetchSeriesByGenre = async (
    genre: string,
    page: number = 1,
    lang: string = 'pt-BR',
): Promise<TmdbMediaProps[] | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${token}&language=${lang}&with_genres=${genre}&page=${page}&include_image_language=${region},en,null`, {
            cache: 'force-cache',
            next: { revalidate: 43200 }
        });
        if (response.ok) {
            return (await response.json()).results;
        };

    } catch (err) {
        console.error(err);
    };
};