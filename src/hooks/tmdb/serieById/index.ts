import { TmdbMediaProps } from "@/app/[lang]/types";

// faz uma busca mais detalhada de uma serie com o id fornecido
export const fetchSeriebyId = async (
    serieId: string,
    lang: string = 'pt-BR',
): Promise<TmdbMediaProps | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${token}&language=${lang}&append_to_response=videos,credits,images&include_image_language=${region},en`);
        if (response.ok) {
            return await response.json();
        };

    } catch (err) {
        console.error(err);
    };
};