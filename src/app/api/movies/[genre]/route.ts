import { NextRequest, NextResponse } from "next/server";

import useTmdbFetch from "@/hooks/tmdb";

import { checkAvailability } from "@/utils/tmdbApiData/availability";

type ParamProps = {
    genre: string;
};

export async function GET( req: NextRequest, { params } : { params: Promise<ParamProps> }) {

    const { fetchMoviesByGenre, fetchReleasedMovies } = useTmdbFetch();
    const { genre } = await params;
    const query = req.nextUrl.searchParams;
    const page = query.get('page') ? Number(query.get('page')) : 1;

    if ( genre === 'release' ) {
        const releasedMovies = await fetchReleasedMovies( page );
        const filtered = await checkAvailability( releasedMovies );
        return NextResponse.json({ movies: filtered, page });
    };

    const movies = await fetchMoviesByGenre( genre, page );
    const filtered = await checkAvailability( movies );
    return NextResponse.json({ movies: filtered, page });
};