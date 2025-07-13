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
    const [ scrollSnaps, setScrollSnaps ] = useState<number[]>([]);

    // lida com a nevegaçao entre paginas
    const navigate = useCallback(( slideId: string ) => {
        push(`/player/${slidesType}/${slideId}`, {
            scroll: true
        });
    }, [slidesType, push]);

    // recebe uma lista com o index de cada slide do carousel
    const getScrollSnaps = useCallback(( list: number[] ) => {
        setScrollSnaps(list);
    }, []);

    // recebe o index do slide e atualiza a lista de slides ativos
    const getActiveSlide = useCallback(( index: number ) => {
        if (!slidesData || !scrollSnaps ) return;
        const snaps = scrollSnaps.length - 1;
        const prev = index === 0 ? snaps : index - 1;
        const next = index === snaps ? 0 : index + 1;
        setCurrentSlide({...slidesData[index]});
        setActiveSlides([prev, index, next]);
        console.log(prev, index, next);
    }, [ slidesData, scrollSnaps ]);

    return slidesData ? (
        <section className='header-slides'>
            <EmblaCarousel 
                navigationType="header" 
                slidesPerView={1} 
                autoplay={true}
                loop={true}
                activeSlide={getActiveSlide}
                scrollSnaps={getScrollSnaps}>
            
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