import { TitleInfo } from "..";
type ComponentProps = { tmdbId: string, idType: 'tmdb_movie_id' | 'tmdb_tv_id'};

export const searchInfoByTmdbId = async (props: ComponentProps): Promise<TitleInfo | undefined> => {
    const token = process.env.WATCH_MODE_API_KEY;
    const { tmdbId, idType } = props;
    try {
        const response = await fetch(`https://api.watchmode.com/v1/search/?apiKey=${token}&search_field=${idType}&search_value=${tmdbId}&types=movie,tv`, {
            cache: 'force-cache',
            next: { revalidate: 3600 }
        });
        if (response.ok) {
            const data = await response.json();
            return data.title_results[0];
        };
    } catch (error) {
        console.error('Watchmode: Erro ao buscar informações sobre o titulo.' + error);
    };
}