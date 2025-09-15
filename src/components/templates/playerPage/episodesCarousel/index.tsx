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
                        <div className="embla__slide" key={`episode-${episode.id}`}>
                            {/* imagem */}
                            <img
                                src={still_image_base_url + episode.still_path}
                                alt={`Imagem poster da temporada ${seasonNumber} da serie ${serieName}`}
                                loading="lazy"
                                className='w-full aspect-video object-cover rounded-md bg-surface'
                            />

                            {/* informações do episodeo */}
                            <div className="max-w-[90%] overflow-ellipsis">
                                {/* titulo */}
                                <h3 className="[font-size:clamp(1.125rem,2vw,1.25rem)] line-clamp-1 font-raleway font-bold text-secondary lg:[font-size:clamp(1.25rem,1.4vw,1.375rem)]">
                                    {episode.name ?? ''}
                                </h3>
                                <div className="flex gap-x-[12px] font-medium [font-size:clamp(1.125rem,1.3vw,1.25rem)] text-secondary">
                                    {/* Data de lançamento  */}
                                    <p className="flex items-center w-fit">
                                        {getReleaseDate(episode.air_date)}
                                    </p>
                                    {/* Duração do episodio */}
                                    <p>{getRunTime(episode.runtime)}</p>
                                </div>
                                {/* Descrição */}
                                <p className="[font-size:clamp(1rem,1.8vw,1.125rem)] line-clamp-4 font-normal mt-2">
                                    {episode.overview.length > 3 ?
                                        episode.overview
                                        :
                                        'Desculpe... não foi possível carregar a descrição deste conteúdo.'
                                    }
                                </p>
                            </div>
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div>
    );
};