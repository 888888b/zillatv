import { TmdbMediaProps } from "@/app/[lang]/types";

// busca filmes lançamentos com base na data fornecida
export const fetchReleasedMovies = async (
    page: number = 1,
    lang: string = 'pt-BR',
): Promise<TmdbMediaProps[] | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const newDate = new Date().toISOString().split('T')[0];
    const region = lang.split('-')[0];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${token}&primary_release_date.gte=${newDate}&sort=primary_release_date.desc&language=${lang}&page=${page}&include_image_language=${region},en,null`, {
            cache: 'force-cache',
            next: { revalidate: 18000 }
        });
        if (response.ok) {
            return (await response.json()).results;
        };

    } catch (err) {
        console.error(err);
    };
};