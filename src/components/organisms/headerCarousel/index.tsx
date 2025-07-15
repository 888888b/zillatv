'use client';

// hooks
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import FurtherDetailsButton from '@/components/molecules/detailsButton';
import Title from './title';
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
    const { slidesData, slidesType, currentPage } = props;
    const [ currentSlide, setCurrentSlide ] = useState<tmdbObjProps | null>(null);
    const [ activeSlides, setActiveSlides ] = useState<number[]>([]);

    // lida com a nevegaçao entre paginas
    const navigate = useCallback(( slideId: string ) => {
        push(`/player/${slidesType}/${slideId}`, {
            scroll: true
        });
    }, [slidesType, push]);

    // recebe o index do slide e atualiza a lista de slides ativos
    const getActiveSlide = useCallback(( slideInView: number, numberOfSlides: number ): void => {
        if (!slidesData) return;
        const prev = slideInView === 0 ? numberOfSlides - 1 : slideInView - 1;
        const next = slideInView === numberOfSlides - 1 ? 0 : slideInView + 1;
        setCurrentSlide({...slidesData[slideInView]});
        setActiveSlides([prev, slideInView, next]);
    }, [ slidesData ]);

    return slidesData ? (
        <section className='header-slides'>
            <EmblaCarousel 
                navigationType="header" 
                slidesPerView={1} 
                autoplay={true}
                loop={true}
                activeIndex={getActiveSlide}>
            
                {/* Gerando slides apartir da resposta da api do TMDB */}
                { slidesData.map(( slide, index ) => (
                    // Container da imagem do slide
                    <Image 
                        key={`${currentPage}-${slide.id}`} 
                        className={`embla__slide ${activeSlides.includes(index) ? 'active-slide' : 'disable-slide'}`}
                        slideData={slide}
                    />
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