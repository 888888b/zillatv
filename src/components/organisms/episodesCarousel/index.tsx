'use client';

// componentes
import { LazyLoadImage } from "react-lazy-load-image-component";
import EmblaCarousel from "../emblaSlides";

// funções utilitarias
import { getRunTime } from "@/components/utils/tmdbApiData/runtime";
import { getReleaseDate } from "@/components/utils/tmdbApiData/releaseDate";

// estilos
import './styles.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

import { tmdbConfig } from "@/app/constants";

type ComponentProps = {
    episodes: tmdbObjProps[];
    serieId: string;
    serieName: string;
    seasonNumber: string;
};

export default function EpisodesCarousel( props: ComponentProps ) {
    const { still_image_base_url } = tmdbConfig;

    return (
        <div className="season-container">
            <EmblaCarousel navigationType='default'>
                {/* Gerando slides apartir da lista de episodios retornados pela api do TMDB */}
                { props.episodes.map(( episode: tmdbObjProps ) => (
                    episode.still_path ? (
                        // slide/episodio
                        <div className="embla__slide" key={`episode-${episode.id}`}>
                            {/* imagem */}
                            <img
                                src={still_image_base_url + episode.still_path}
                                alt={`presentation image of the seventh season of ${props.serieName}`}
                                loading="lazy"
                                className='w-full h-44 object-cover rounded-md bg-darkpurple'
                            />

                            {/* Titulo do episodio */}
                            <p 
                                className="text-base mt-2 line-clamp-1 font-bold leading-relaxed text-neutral-100 lg:text-lg">
                                Ep_{ episode.episode_number && `${episode.episode_number}:` } { episode.name ?? '' }
                            </p>

                            <div className="my-2 flex gap-x-3 lg:text-lg">
                                {/* Data de lançamento  */}
                                <p className="bg-primary text-black rounded-[4px] flex items-center w-fit px-3 h-6">
                                    {getReleaseDate( episode.air_date )}
                                </p>

                                {/* Duração do episodio */}
                                <p>{getRunTime( episode.runtime )}</p>
                            </div>

                            {/* Descrição */}
                            <p 
                                className="text-base lg:text-lg line-clamp-3 font-normal text-neutral-400 leading-loose">
                                { 
                                episode.overview.length > 3 ? 
                                episode.overview : 
                                'Desculpe... não foi possível carregar a descrição deste conteúdo.' 
                                }
                            </p>
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div>
    );
};