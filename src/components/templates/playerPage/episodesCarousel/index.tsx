'use client';

// hooks
import { useEffect, useRef, useState } from 'react';

// componentes
import EmblaCarousel from "@/components/organisms/emblaSlides";

// funções utilitarias
import { getRunTime } from "@/utils/tmdbApiData/runtime";
import { getReleaseDate } from "@/utils/tmdbApiData/releaseDate";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
type ComponentProps = {
    episodes: tmdbObjProps[];
    serieName: string;
    seasonNumber: string;
    className?: string;
    isDataLoading: boolean;
};

import { tmdbConfig } from "@/app/constants";
import './styles.css';
import { setTimeout } from 'timers';

export default function EpisodesCarousel(props: ComponentProps) {

    const [episodesList, setEpisodesList] = useState<tmdbObjProps[] | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);
    const { still_image_base_url } = tmdbConfig;
    const { 
        episodes, 
        serieName, 
        seasonNumber, 
        className, 
        isDataLoading 
    } = props;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (episodesList) {
            el.style.animation = 'none';
            void el.offsetWidth
            el.style.animation = 'fade-out 0.15s ease-in forwards';
            setTimeout(() => {
                setEpisodesList(episodes);
                el.style.animation = 'fade-in 0.15s ease-in forwards';
            }, 150); 
        } else {
            setEpisodesList(episodes);
        };
    }, [isDataLoading]);

    return (
        <div ref={ref} className={`season-container ${className}`}>
            <EmblaCarousel navigationType='default'>
                {/* Gerando slides apartir da lista de episodios retornados pela api do TMDB */}
                {episodesList?.map((episode: tmdbObjProps) => (
                    episode.still_path ? (
                        // slide/episodio
                        <div className="embla__slide text-[17px] lg:text-lg" key={`episode-${episode.id}`}>
                            {/* imagem */}
                            <img
                                src={still_image_base_url + episode.still_path}
                                alt={`Imagem poster da temporada ${seasonNumber} da serie ${serieName}`}
                                loading="lazy"
                                className='w-full aspect-[2/1] object-cover rounded-[10px] bg-surface'
                            />

                            {/* Titulo do episodio */}
                            <div className="flex flex-col gap-[5px]">
                                <h3
                                    className="line-clamp-1 font-semibold leading-6 text-secondary/95">
                                    Ep_{episode.episode_number && `${episode.episode_number}:`} {episode.name ?? ''}
                                </h3>
                                <div className="flex gap-x-[10px] text-primary">
                                    {/* Data de lançamento  */}
                                    <p className="flex items-center w-fit">
                                        {getReleaseDate(episode.air_date)}
                                    </p>
                                    {/* Duração do episodio */}
                                    <p>{getRunTime(episode.runtime)}</p>
                                </div>
                            </div>

                            {/* Descrição */}
                            <p className="line-clamp-3 font-normal text-text leading-7 lg:leading-[30px]">
                                { episode.overview.length > 3 ?
                                    episode.overview 
                                    :
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