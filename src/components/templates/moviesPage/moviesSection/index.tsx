'use client';

// hooks
import { 
    useContext, 
    useCallback, 
    useState, 
    useEffect 
} from "react";
import useTmdbFetch from "@/components/hooks/tmdb";

// componentes
import CategoryBar from "@/components/molecules/categoryBar";
import MoviesSeriesSection from "@/components/organisms/moviesSeriesSection";

// contextos
import { TmdbContext, tmdbObjProps } from "@/contexts/tmdbContext";

// funções utilitarias
import { checkAvailability } from "@/components/utils/tmdbApiData/availability";

type ComponentProps = {
    className?: string
};

export default function MoviesSection( props: ComponentProps ) {

    const [ selectedGenre, setSelectedGenre ] = useState('16');
    const [ 
        contentData, 
        setContentData 
    ] = useState<tmdbObjProps[] | null>( null );

    // funções para buscar filmes
    const {
        fetchMoviesByGenre,
        fetchReleasedMovies
    } = useTmdbFetch();

    const { movieGenres } = useContext( TmdbContext );

    const updateSelectedGenre = useCallback(( newGenre: string ) => {
        setSelectedGenre( newGenre );
    }, []);

    // buscar filmes por genero
    const fetchMovies = async () => {
        const movies = await fetchMoviesByGenre( selectedGenre );
        const filtered = await checkAvailability( movies );
        setContentData([ ...filtered ]);
    };

     // buscar os filmes mais recentes
     const fetchLatestMovies = async () => {
        const movies = await fetchReleasedMovies();
        const filtered = await checkAvailability( movies );
        setContentData([ ...filtered ]);
    };

    useEffect(() => {
        if ( selectedGenre === 'release' ) {
            fetchLatestMovies();
        } else {
            fetchMovies();
        };       
    }, [ selectedGenre ]);

    return (
        <div className={`flex flex-col gap-y-10 px-4 md:px-8 xl:px-10 my-6 lg:my-0 lg:-translate-y-24 relative z-10 ${props.className}`}>
            <CategoryBar
                onSelectGenre={updateSelectedGenre}
                genresList={movieGenres}
            />
            { contentData ?
                <MoviesSeriesSection data={contentData} mediaType="movie"/>
            : null }
        </div>
    );
};