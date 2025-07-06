'use client';

// hooks
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import FurtherDetailsButton from '@/components/molecules/detailsButton';
import { Title } from './title';
import DetailsBar from './details';
import Image from './image';

import './styles.css';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

type HeaderCarouselProps = {
    currentPage: string
    slidesType: string
    slidesData: tmdbObjProps[] | undefined
};

export default function HeaderCarousel( props: HeaderCarouselProps ) {

    const { push } = useRouter();
    const [ currentSlide, setCurrentSlide ] = useState<tmdbObjProps | null>( null );

    // seleciona o slide atual / ativo
    const getActiveSlideDetails = useCallback(( index: number ): void => {
        if ( props.slidesData ) {
            setCurrentSlide({...props.slidesData[index]});
        };
    }, [ props.slidesData ]);


    // lida com a nevegaçao entre paginas
    const navigate = ( slideId: string ) => {
        push(`/player/${props.slidesType}/${slideId}`, {
            scroll: true
        });
    };

    return props.slidesData ? (
        <section className='header-slides'>
            <EmblaCarousel 
                navigationType="header" 
                slidesPerView={1} 
                autoplay={true}
                loop={true}
                activeSlide={getActiveSlideDetails}>
            
                {/* Gerando slides apartir da resposta da api do TMDB */}
                { props.slidesData.map(( slide ) => (
                    // Container da imagem do slide
                    <Image key={`${props.currentPage}-${slide.id}`} slideData={slide}/>
                ))}  
            </EmblaCarousel>

            {/* detalhes do filme/serie */}
            { currentSlide ? (
                <div className="absolute left-0 bottom-12 w-full sm:w-fit px-5 flex flex-col items-center justify-between gap-y-4 sm:items-start sm:px-10 sm:bottom-[133px] lg:px-[70px] z-10 pointer-events-none">
                    {/* titulo */}
                    <Title title={currentSlide.title ?? currentSlide.name}/>
                    {/* lista com algumas informaçoes sobre filme/serie */}
                    <DetailsBar slideData={currentSlide}/>
                    {/* Ir para pagina de detalhes */}
                    <FurtherDetailsButton onClick={() => navigate(currentSlide.id)} className='mt-2'/>
                </div>  
            ) : null }            
        </section>
    ) : null;
};