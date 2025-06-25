'use client';

// componentes
import WatchTrailer from '@/components/templates/playerPage/header/trailerPlayback';

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

// funções utilitarias
import { getReleaseDate } from '@/components/utils/tmdbApiData/releaseDate';
import { getRunTime } from '@/components/utils/tmdbApiData/runtime';
import { getImdbReviews } from '@/components/utils/tmdbApiData/reviews';

import { tmdbConfig } from '@/app/constants';

import './styles.css';

type HeaderProps = {
    playerData: tmdbObjProps;
};

export default function Header(props: HeaderProps) {

    const playerData = props.playerData;
    const {
        high_resolution_backdrop,
        high_resolution_poster
    } = tmdbConfig;

    return (
        <div className='header-wrapper'>
            <div className='w-full relative'>
                {/* Imagem do filme/serie */}
                <div className="w-full aspect-[1/1.55] md:aspect-[1/0.7] lg:aspect-[1/0.5] max-h-[600px] md:max-h-screen">
                    <img
                        src={
                            playerData.backdrop_path ?
                            high_resolution_backdrop + playerData.backdrop_path :
                            high_resolution_poster + playerData.poster_path
                        }
                        alt={`${playerData.title ?? playerData.name} movie/serie presentation image`}
                        className='w-full object-cover h-3/4 md:h-full'
                    />
                </div>

                {/* Informações do filme/serie */}
                <div className='w-full z-20 absolute bottom-10 md:bottom-14 px-4 flex flex-col gap-y-4 items-start md:pl-6 lg:pl-8'>

                    {/* Titulo */}
                    <h1 className='text-3xl font-extrabold text-white line-clamp-3 font-raleway sm:text-5xl sm:w-1/2 xl:w-2/5 text-start 2xl:text-6xl'>
                        {playerData.title ?? playerData.name}
                    </h1>

                    <div className='flex gap-x-3 text-white/60 lg:text-white/80 font-semibold items-center flex-wrap justify-start md:w-1/2 md:max-w-md'>
                        {/* data de lançamento */}
                        <span>
                            {getReleaseDate(playerData.release_date ?? playerData.first_air_date)}
                        </span>

                        {/* tempo de duração */}
                        {playerData.runtime && (
                             <span>
                                {getRunTime(playerData.runtime)}
                            </span> 
                        )}

                        {/* avaliação */}
                        <span className='hidden sm:block'>
                            {getImdbReviews(playerData.vote_average, playerData.vote_count)}
                        </span>

                        {/* generos */}
                        <p>
                            {playerData.genres.map((genre: any) => (
                                genre.name
                            )).join(', ')}
                        </p>
                    </div>

                    {/* botao que aciona o player */}
                    <WatchTrailer
                        contentName={playerData.name ?? playerData.title}
                        contentId={playerData.videos.results[0]?.key ?? ''}
                    />
                </div>

                <div className="overlay"></div>
                <div className='second-overlay'></div>
            </div>
        </div>
    );
};