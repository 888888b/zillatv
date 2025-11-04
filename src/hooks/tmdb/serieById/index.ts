import { TmdbMediaProps } from "@/app/types";

// faz uma busca mais detalhada de uma serie com o id fornecido
export const fetchSeriebyId = async ( serieId: string ): Promise<TmdbMediaProps | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${token}&language=pt-BR&page=1&include_image_language=pt,en&append_to_response=videos,credits,images`);
        
        if ( response.ok ) {
            const fetchData = await response.json();
            return fetchData;
        };
    } catch (error) {
        console.error(error);
    };
};