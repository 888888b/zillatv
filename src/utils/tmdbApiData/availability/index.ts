import { TmdbMediaProps } from "@/app/types";

// Filtra e seleciona somente o filme/serie que possuir imagens disponiveis
export const checkAvailability = async ( data: TmdbMediaProps[] | undefined | (TmdbMediaProps | undefined)[] ) => {
    if ( !data ) {
        return [];
    };

    const filteredContent: TmdbMediaProps[] = await new Promise( resolve => {
        const filtered = data.filter( item => item && ( item.poster_path || item.backdrop_path ));
        resolve( filtered as TmdbMediaProps[] );
    });

    return filteredContent;
};