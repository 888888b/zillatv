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

export default function SeriesSection( props: ComponentProps ) {

    const [ selectedGenre, setSelectedGenre ] = useState('16');
    const [ 
        contentData, 
        setContentData 
    ] = useState<tmdbObjProps[] | null>( null );

    // funções para buscar series
    const {
        fetchSeriesByGenre,
        fetchReleasedSeries
    } = useTmdbFetch();

    const { serieGenres } = useContext( TmdbContext );

    const updateSelectedGenre = useCallback(( newGenre: string ) => {
        setSelectedGenre( newGenre );
    }, []);

    // buscar series por genero
    const fetchSeries = async () => {
        const series = await fetchSeriesByGenre( selectedGenre );
        const filtered = await checkAvailability( series );
        setContentData([ ...filtered ]);
    };

     // buscar as series mais recentes
     const fetchLatestSeries = async () => {
        const series = await fetchReleasedSeries();
        const filtered = await checkAvailability( series );
        setContentData([ ...filtered ]);
    };

    useEffect(() => {
        if ( selectedGenre === 'release' ) {
            fetchLatestSeries();
        } else {
            fetchSeries();
        };       
    }, [ selectedGenre ]);

    return (
        <div className={`flex flex-col gap-y-10 px-4 md:px-8 xl:px-10 my-6 lg:my-0 lg:-translate-y-24 relative z-10 ${props.className}`}>
            <CategoryBar
                onSelectGenre={updateSelectedGenre}
                genresList={serieGenres}
            />
            { contentData ?
                <MoviesSeriesSection data={contentData} mediaType="movie"/>
            : null }
        </div>
    );
};