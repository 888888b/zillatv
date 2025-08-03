/*Função que obtem o ano de lançamento de um filme ou serie*/
export const getReleaseDate = ( date: string ): string => {
    if (!date) return '';
    const newDate = [];
    for ( let i = 0; i < 4; i++ ) {
        newDate.push( date[i] );
    }
    return newDate.join('');
};