import { TmdbMediaProps } from "@/app/types";

// faz uma busca mais detalhada de um filme com o id fornecido
export const fetchMovieById = async (movieId: string, lang: string = 'pt-BR'): 
Promise<TmdbMediaProps | undefined> => {
  const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const region = lang.split('-')[0];
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${token}&language=${lang}&append_to_response=videos,credits,images&include_image_language=${region},en`);
    if (response.ok) {
      return await response.json();
    };

  } catch (err) {
    console.error(err);
  };
};