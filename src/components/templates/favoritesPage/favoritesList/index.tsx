// hooks
import { useRouter } from "next/navigation";
import useFirebase from "@/hooks/firebase";
// icones
import { FaPlay } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
// funções utilitarias
import { getReleaseDate } from "@/utils/tmdb/getReleaseDate";
import { getRunTime } from "@/utils/tmdb/getRuntime";
import { getImdbReviews } from "@/utils/tmdb/getReviews";
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { tmdbConfig } from "@/app/[lang]/constants";

type ComponentProps = {
    contentData: TmdbMediaProps[]
};

export default function FavoritesList( props: ComponentProps ) {

    // variaveis
    // -------------------------------------------------------------
    const { contentData } = props;
    const { 
        low_resolution_backdrop, 
        low_resolution_poster 
    } = tmdbConfig;
    const { push } = useRouter();
    const { deleteUserFavoritesOnDb } = useFirebase();

    // funções
    // -------------------------------------------------------------
    const navigate = ( content: TmdbMediaProps ) => {
        const contentObjKeys = Object.keys( content );
        
        // considera o conteudo como 'serie'
        if (contentObjKeys.includes( 'first_air_date' )) {
            push(`player/serie/${content.id}`, { scroll: true });
            return;
        };

        // considera o conteudo como 'filme'
        push(`player/movie/${content.id}`, { scroll: true });
    };

    // const deleteFavorite = ( content: TmdbMediaProps ) => {
    //     const contentObjKeys = Object.keys( content );

    //     // considera o conteudo como 'serie'
    //     if (contentObjKeys.includes( 'first_air_date' )) {
    //         deleteUserFavoritesOnDb( content.id, 'serie' );
    //         return;
    //     };

    //     // considera o conteudo como 'filme'
    //     deleteUserFavoritesOnDb( content.id, 'movie' );
    // };

    return (
        <div className="px-4 md:px-8 xl:px-10 pb-6 pt-32 xl:pt-40 relative min-h-[calc(100vh-112px)] sm:min-h-[calc(100vh-80px)] before:absolute before:top-0 before:left-0 before:w-full before:h-[550px] before:bg-gradient-to-b before:from-darkpurple before:via-darkpurple before:to-deepnight before:z-[1] bg-transparent">
            {/* titulo da seção */}
            <h1 className="font-raleway font-extrabold text-2xl lg:text-4xl text-white text-center relative z-[2]">
                Minha lista de favoritos
            </h1>
            <div className="w-full h-0.5 rounded-3xl bg-white/10 mt-1 relative z-[2]"></div>

            {/* Seção de aprensentação do filmes e series favoritos */}
            <div className="mt-10 flex flex-col gap-y-10 relative z-[2]">
                {contentData.map((content, index) => (
                    // Container de apresentação com informações do filme/serie
                    <div key={`favorite-${content.id}`}>
                        {index !== 0 && (
                            /* linha para separar os filmes/series */
                            <div className="w-full h-0.5 rounded-3xl bg-white/10 mb-10"></div>
                        )}

                        <div className="w-full flex gap-x-3">
                            <div className="w-1/3 rounded-[4px] overflow-hidden">
                                {/* Imagem do filme/serie */}
                                <img
                                    src={
                                        content.backdrop_path ?
                                            `${low_resolution_backdrop}${content.backdrop_path}` :
                                            `${low_resolution_poster}${content.poster_path}`
                                    }
                                    alt={`${content.title ?? content.name} movie/serie presentation image`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Detalhes do filme/serie */}
                            <div className="w-2/3 flex flex-col items-start gap-y-4">
                                <h3 className="font-raleway font-extrabold text-xl line-clamp-1">
                                    {content.title ?? content.name}
                                </h3>
                                <div className='flex gap-x-3 text-neutral-300 lg:text-white/80 font-medium items-center flex-wrap'>
                                    {/* data de lançamento */}
                                    <span>
                                        {getReleaseDate(content.release_date ?? content.first_air_date)}
                                    </span>
                                    <span className='w-1 h-1 rounded-full bg-neutral-400 *:whitespace-nowrap' />
                                    {/* tempo de duração */}
                                    {content.runtime ? <span>
                                        {getRunTime(content.runtime)}
                                    </span> : null}
                                    {/* avaliação */}
                                    <span className='hidden sm:block'>
                                        {getImdbReviews(content.vote_average, content.vote_count)}
                                    </span>
                                    {/* generos */}
                                    <p>
                                        {content.genres.map((genre: any) => (
                                            genre.name
                                        )).join(', ')}
                                    </p>
                                </div>
                                <p className="text-base lg:text-[17px] font-normal text-neutral-400 leading-relaxed line-clamp-3">{content.overview}</p>
                                <button
                                    onClick={() => { navigate(content) }}
                                    className="px-20 btn bg-primary hover:bg-primary text-[17px] font-normal text-black border-none outline-none rounded-md cursor-pointer">
                                    <FaPlay className="text-[15px]" />
                                    Assitir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};