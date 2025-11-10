'use client';
// hooks
import { useEffect, useRef, useState } from 'react';
// componentes
import EmblaCarousel from "@/components/organisms/emblaSlides";
import LazyImage from '../../lazyImage';
//utilitarios
import { getRunTime } from "@/utils/tmdbApiData/runtime";
import { tmdbConfig } from "@/app/[lang]/constants";
import { setTimeout } from 'timers';
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
type ComponentProps = {
    episodes: TmdbMediaProps[];
    serieName: string;
    seasonNumber: string;
    className?: string;
    isDataLoading: boolean;
};

import './styles.css';

export default function EpisodesCarousel(props: ComponentProps) {
    const [episodesList, setEpisodesList] = useState<TmdbMediaProps[] | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);
    const { high_resolution_still, low_resolution_still } = tmdbConfig;
    const { episodes, serieName, seasonNumber, className, isDataLoading } = props;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!episodesList) {
            setEpisodesList(episodes);
        } else {
            el.style.animation = 'none';
            void el.offsetWidth
            el.style.animation = 'fade-out 0.15s ease-in forwards';
            setTimeout(() => {
                setEpisodesList(episodes);
                el.style.animation = 'fade-in 0.15s ease-in forwards';
            }, 150);
        };
    }, [isDataLoading]);

    return (
        <div ref={ref} className={`episodes-carousel ${className}`}>
            <EmblaCarousel navigationType='default'>
                {/* Gerando slides apartir da lista de episodios retornados pela api do TMDB */}
                {episodesList?.map((episode: TmdbMediaProps) => (
                    episode.still_path ? (
                        // slide/episodio
                        <div className="embla__slide bg-surface" key={`episode-${episode.id}`}>
                            <div className='px-2 pt-2'>
                                {/* imagem */}
                                <LazyImage
                                    lowSrc={low_resolution_still + episode.still_path}
                                    highSrc={high_resolution_still + episode.still_path}
                                    alt={`Poster da temporada ${seasonNumber} da serie ${serieName}`}
                                    className='w-full aspect-video object-cover rounded-md bg-secondary/5'
                                />
                            </div>

                            {/* informações do episodeo */}
                            <div className="p-6 overflow-ellipsis">
                                {/* titulo */}
                                <h3 className="[font-size:clamp(1.0625rem,1.8vw,1.125rem)] line-clamp-1 font-raleway font-bold text-secondary lg:[font-size:clamp(1.125rem,1.21vw,1.1875rem)]">
                                    {episode.name ?? ''}
                                </h3>
                                {/* Duração do episodio */}
                                <p className='font-medium [font-size:clamp(1rem,1.7vw,1.0625rem)] lg:[font-size:clamp(1.0625rem,1.15vw,1.125rem)] text-secondary'>
                                    {getRunTime(episode.runtime)}
                                </p>
                                {/* Descrição */}
                                <p className="[font-size:clamp(1rem,1.7vw,1.0625rem)] lg:[font-size:clamp(1.0625rem,1.15vw,1.125rem)] line-clamp-4 font-normal mt-[6px]">
                                    {episode.overview}
                                </p>
                            </div>
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div>
    );
};