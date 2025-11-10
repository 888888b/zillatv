import { TmdbMediaProps } from "@/app/[lang]/types";

type MediaType = 'movie' | 'tv' | 'all';

export const fetchAllTrending = async (type: MediaType = 'all', lang: string = 'pt-BR'):
    Promise<TmdbMediaProps[] | undefined> => {
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${token}&language=${lang}&include_image_language=${region},en,null`, {
            cache: 'force-cache',
            next: { revalidate: 43200 }
        });
        if (response.ok) {
            return (await response.json()).results;
        };

    } catch (err) {
        console.error('Erro ao buscar conteudo em alta' + err);
    };
};