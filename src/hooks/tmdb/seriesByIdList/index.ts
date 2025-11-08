import { TmdbMediaProps } from "@/app/types";
import { fetchSeriebyId } from "../serieById";

// Busca multiplas series a partir de uma lista de ids
export const fetchSeriesByIdList = async (
    idsList: string[],
    lang: string = 'pt-BR'
): Promise<(TmdbMediaProps | undefined)[]> => {
    return new Promise((resolve, reject) => {
        try {
            Promise.all(idsList.map(async (id) => {
                return await fetchSeriebyId(id, lang);
            })).then(result => {
                resolve(result);
            });

        } catch (err) {
            console.error(err);
            reject(err);
        };
    });
};