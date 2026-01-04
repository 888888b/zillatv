// tipos
import { FetchReturn } from "../types";
import { Platform, seriesNetworks, moviesProviders } from '@/app/[lang]/constants';
export type MediaType = "movie" | "tv" | 'serie';

export const fetchPlatformContent = async (
    platform: Platform,
    type: MediaType = "tv",
    page: number = 1,
    lang: string = 'pt-BR'
): Promise<FetchReturn | undefined> => {
    try {
        const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const networkId = seriesNetworks[platform];
        const providerId = moviesProviders[platform];
        const region = lang.split('-')[1];
        const imgLang = lang.split('-')[0];
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${token}&${type === 'movie' ? `with_watch_providers=${providerId}` : `with_networks=${networkId}`}&watch_region=${region}&language=${lang}&include_image_language=${imgLang},en,null&page=${page}`;
        const res = await fetch(url, {
            cache: page === 1 ? 'force-cache' : 'no-store',
            next: { revalidate: page === 1 && 14400 } // 4 horas
        });
        
        if (!res.ok) {
            throw new Error(`Erro ao buscar ${type} da plataforma ${platform}: ${res.status}`);
        };

        const data = await res.json();
        return { pages: data.total_pages, results: data.results };

    } catch (err) {
        console.error('Erro ao buscar filmes em alta' + err);
    };
};
