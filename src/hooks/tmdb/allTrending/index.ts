import { tmdbObjProps } from "@/contexts/tmdbContext";

type MediaType = 'movie' | 'tv' | 'all';

export const fetchAllTrending = async (mediaType?: MediaType): Promise<tmdbObjProps[] | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const type = mediaType ? mediaType : 'all';
    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${token}&language=pt-BR`,{
            cache: 'force-cache',
            next: { revalidate: 43200 }
        });
        if ( response.ok ) {
            const data = await response.json();
            return data.results;
        };
    } catch (error) {
        console.error( 'Erro ao buscar conteudo em alta' + error );  
    };
};