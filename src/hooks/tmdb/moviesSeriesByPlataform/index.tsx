// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
export type Platform =
    | "netflix"
    | "disney"
    | "hbo"
    | "hulu"
    | "prime";

export type ContentType = "movie" | "tv";

const PLATFORM_IDS: Record<Platform, number> = {
    netflix: 213,
    disney: 2739,
    hbo: 49,
    hulu: 453,
    prime: 1024,
};

export const fetchPlatformContent = async (
    platform: Platform,
    type: ContentType = "tv",
    page: number = 1
): Promise<tmdbObjProps[] | undefined> => {
    try {
        const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const networkId = PLATFORM_IDS[platform];
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${token}&with_networks=${networkId}&language=pt-BR&include_image_language=pt&page=${page}`;
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
