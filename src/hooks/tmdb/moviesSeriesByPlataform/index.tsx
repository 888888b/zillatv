// tipos
import { TmdbMediaProps } from "@/app/types";
import { Platform, seriesNetworks, moviesProviders }  from '@/app/constants';
export type ContentType = "movie" | "tv";

export const fetchPlatformContent = async (
    platform: Platform,
    type: ContentType = "tv",
    page: number = 1
): Promise<TmdbMediaProps[] | undefined> => {
    try {
        const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const networkId = seriesNetworks[platform];
        const providerId = moviesProviders[platform];
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${token}&${type === 'movie' ? `with_watch_providers=${providerId}` : `with_networks=${networkId}`}&watch_region=BR&language=pt-BR&include_image_language=pt,null&page=${page}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Erro ao buscar ${type} da plataforma ${platform}: ${res.status}`);
        };

        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('Erro ao buscar filmes em alta' + error);
    };
};
