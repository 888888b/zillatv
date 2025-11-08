import { TmdbMediaProps } from "@/app/types";

// busca as temporadas de uma serie com base no id da serie e numero da temporada
export const fetchSeasons = async (
    serieId: string,
    seasonNumber: string,
    lang: string = 'pt-BR',
): Promise<TmdbMediaProps[] | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?api_key=${token}&language=${lang}`);
        if (response.ok) {
            return await response.json();
        };

    } catch (err) {
        console.error(err);
    };
};