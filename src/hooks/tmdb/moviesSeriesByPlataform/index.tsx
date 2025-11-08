// tipos
import { TmdbMediaProps } from "@/app/types";
import { Platform, seriesNetworks, moviesProviders } from '@/app/constants';
export type MediaType = "movie" | "tv" | 'serie';

export const fetchPlatformContent = async (
    platform: Platform,
    type: MediaType = "tv",
    page: number = 1,
    lang: string = 'pt-BR'
): Promise<TmdbMediaProps[] | undefined> => {
    const region = lang.split('-')[1];
    try {
        const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const networkId = seriesNetworks[platform];
        const providerId = moviesProviders[platform];
        const region = lang.split('-')[0];
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${token}&${type === 'movie' ? `with_watch_providers=${providerId}` : `with_networks=${networkId}`}&watch_region=${region}&language=${lang}&page=${page}&include_image_language=${region},en,null`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Erro ao buscar ${type} da plataforma ${platform}: ${res.status}`);
        };
        return (await res.json()).results;

    } catch (err) {
        console.error('Erro ao buscar filmes em alta' + err);
    };
};
