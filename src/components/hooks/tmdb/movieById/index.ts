import { tmdbObjProps } from "@/contexts/tmdbContext";

// faz uma busca mais detalhada de um filme com o id fornecido
export const fetchMovieById = async ( movieId: string ): Promise<tmdbObjProps | undefined> => {
  const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${token}&language=pt-BR&page=1&include_image_language=pt,en&append_to_response=videos,credits,images`);
      if ( response.ok ){
        const data = await response.json();
        return data;
      };

    } catch (error) {
      console.error(error);
    };
};