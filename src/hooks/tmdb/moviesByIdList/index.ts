import { TmdbMediaProps } from "@/app/[lang]/types";
import { fetchMovieById } from "../movieById";

// Busca multiplos filmes a partir de uma lista de ids
export const fetchMoviesByIdList = async (
    idsList: string[], 
    lang: string = 'pt-BR'
): Promise<(TmdbMediaProps | undefined)[]> => {
    return new Promise((resolve, reject) => {
        try {
            Promise.all(idsList.map(async (id) => {
                const response = await fetchMovieById(id, lang);
                return response;
            })).then(result => {
                resolve(result);
            });
        } catch (err) {
            console.error(err);
            reject(err);
        };
    });
};