import { TmdbMediaProps } from "@/app/[lang]/types";

export const fetchMovieClassics = async (
    type: 'movie' | 'tv',
    page: number = 1,
    lang: string = 'pt-BR'
): Promise<TmdbMediaProps[] | undefined> => {
    const sortBy = type === "movie" ? 
        "primary_release_date.lte=1995-12-31&vote_average.gte=7.5&vote_count.gte=1000&sort_by=vote_average.desc" : 
        "first_air_date.lte=2000-12-31&vote_average.gte=7.5&vote_count.gte=500";
    const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const region = lang.split('-')[0];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${token}&${sortBy}&language=${lang}&page=${page}&include_image_language=${region},en,null`, {
            cache: 'force-cache',
            next: { revalidate: 1000000 }
        });
        if (response.ok) {
            return (await response.json()).results;
        };

    } catch (err) {
        console.error(err);
    };
};