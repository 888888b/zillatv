// Obtem a nota do publico sobre o filme/serie
export const getImdbReviews = ( vote_average: number, vote_count: number ) => {
    return (
        <>
            Imdb: { vote_average.toFixed(0) } ({ vote_count })
        </>
    );
};