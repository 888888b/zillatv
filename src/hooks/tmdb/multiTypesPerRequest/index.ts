import { tmdbObjProps } from "@/contexts/tmdbContext";

export const fetchMultiTypes = async ( keyword: string ): Promise<tmdbObjProps[] | undefined> => {
    const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${keyword}&api_key=${api_key}&include_adult=false&language=en-US&page=1`);
        if ( response.ok ) {
            const data = await response.json();
            return data.results;
        };

    } catch (error) {
        console.error( error );  
    };
};