import { TmdbMediaProps } from "@/app/[lang]/types";

/**
 * Busca as top rated séries (apenas TV) do TMDB
 */
export const fetchTopRatedSeries = async (lang: string = "pt-BR"):
    Promise<TmdbMediaProps[] | undefined> => {

    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split("-")[0];

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${token}&language=${lang}&include_image_language=${region},en,null`,
            {
                cache: "force-cache",
                next: { revalidate: 14400 }
            }
        );

        if (response.ok) {
            return (await response.json()).results.slice(0, 10);
        };

    } catch (err) {
        console.error("Erro ao buscar top rated series: " + err);
    };
};
