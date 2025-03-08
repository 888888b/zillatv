'use client';

// hooks
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

// funções utilitarias
import { getReleaseDate } from '@/components/utils/tmdbApiData/releaseDate';
import { getRunTime } from '@/components/utils/tmdbApiData/runtime';
import { getImdbReviews } from '@/components/utils/tmdbApiData/reviews';

import { tmdbConfig } from "@/app/constants";

import './styles.css';

type HeaderCarouselProps = {
    currentPage: string
    contentType: string
    contentData: tmdbObjProps[] | undefined
};

export default function HeaderCarousel( props: HeaderCarouselProps ) {

    // detalhes do slide atual
    const [ 
        currentSlide, 
        setCurrentSlide 
    ] = useState<tmdbObjProps | null>( null );

    // urls para imagens
    const {
        high_resolution_backdrop,
        high_resolution_poster
    } = tmdbConfig;

    const getActiveSlideDetails = useCallback(( index: number ): void => {
        if ( props.contentData ) {
            setCurrentSlide({...props.contentData[index]});
        };
    }, [ props.contentData ]);

    const { push } = useRouter();

    const navigate = ( contentId: string ) => {
        push(`/player/${props.contentType}/${contentId}`, {
            scroll: true
        });
    };

    return props.contentData ? (
        <section className='header-slides'>
            <EmblaCarousel 
                navigationType="header" 
                slidesPerView={1} 
                autoplay={true}
                loop={true}
                activeSlide={getActiveSlideDetails}>
            
                {/* Gerando slides com base na resposta da api do TMDB */}
                { props.contentData.map(( content ) => (
                    // Container do slide
                    <div key={ `${props.currentPage}-${content.id}` } className='embla__slide relative'>
                        {/* container da imagem */}
                        <div className="header-image-container">
                            <img
                                src={
                                content.backdrop_path ? 
                                `${high_resolution_backdrop}${content.backdrop_path}` :
                                `${high_resolution_poster}${content.poster_path}`
                                }
                                alt={`${content.title ?? content.name} movie/serie presentation image`}
                                className="w-full aspect-[1/1.2] sm:h-full object-cover"
                            />
                        </div>    
                    </div>
                ))}  
            </EmblaCarousel>

            {/* detalhes do filme/serie */}
            { currentSlide ? (
                <div className="absolute left-0 bottom-14 w-full sm:w-fit px-4 flex flex-col gap-y-5 items-center sm:items-start md:px-8 lg:bottom-1/2 lg:translate-y-1/3 xl:px-10 z-10">
                    {/* titulo */}
                    <h2 className="text-3xl font-extrabold text-white text-center line-clamp-2 font-raleway md:text-4xl lg:text-5xl w-1/2 sm:text-start">
                        {currentSlide?.title ?? currentSlide?.name}
                    </h2>

                    <div className='flex gap-x-3 text-white/60 lg:text-white/80 font-semibold items-center flex-wrap justify-center'>
                        {/* data de lançamento */}
                        <span>
                            {getReleaseDate(currentSlide?.release_date ?? currentSlide?.first_air_date)}
                        </span>

                        <span className='w-1 h-1 rounded-full bg-neutral-400 *:whitespace-nowrap'/>

                        {/* tempo de duração */}
                        { currentSlide?.runtime ? <span>
                            {getRunTime(currentSlide?.runtime)}
                        </span> : null}

                        {/* avaliação */}
                        <span className='hidden sm:block'>
                            {getImdbReviews(currentSlide?.vote_average, currentSlide?.vote_count)}
                        </span>

                        {/* generos */}
                        <p className='text-center'>
                            {currentSlide?.genres.map(( genre: any ) => (
                                genre.name
                            )).join(', ')}
                        </p>
                    </div>

                    {/* Ir para pagina de detalhes */}
                    <button 
                        className="outline-none border-none w-full btn rounded-[4px] bg-primary  hover:bg-primary text-black text-base font-bold sm:w-48 sm:rounded-[10px] lg:w-52"
                        onClick={() => navigate(currentSlide.id)}>
                        Ver detalhes
                    </button>
                </div>  
            ) : null }            
        </section>
    ) : null;
};