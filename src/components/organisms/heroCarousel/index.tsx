'use client';
// hooks
import { useState, useCallback, useRef } from 'react';
// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import dynamic from 'next/dynamic';
import SlideInfoWrapper from './slideInfoWrapper'
const SlideImage = dynamic(() => import('../../atoms/heroImage/index'), { ssr: true });
// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';
type HeaderCarouselProps = {
    currentPage: 'home' | 'movies' | 'series';
    slidesData: tmdbObjProps[] | undefined
};

import './styles.css';

export default function HeaderCarousel(props: HeaderCarouselProps) {
    const { slidesData, currentPage } = props;
    const componentRef = useRef<HTMLElement | null>(null);
    const [indexInView, setIndexInView] = useState(0);

    // recebe o index do slide ativo na tela
    const getIndexInView = useCallback((index: number): void => {
        setIndexInView(index);
    }, [setIndexInView]);

    return slidesData ? (
        <section className='hero-carousel' ref={componentRef}>
            <EmblaCarousel
                navigationType="header"
                slidesPerView={1}
                autoplay={true}
                loop={true}
                duration={25}
                selectedSnap={getIndexInView}>
                {/* Gerando slides apartir da resposta da api do TMDB */}
                {slidesData.map( slide => (
                    // Container da imagem do slide
                    <div
                        key={`hero-slide-${slide.id}-${currentPage}`}
                        className='embla__slide'>
                        <SlideImage slideData={slide} className='slide-img' />
                    </div>
                ))}
            </EmblaCarousel>
            {/* Informações sobre o filme/Serie exp:(Titulo, Imagem, Descrição, Generos...) */}
            {slidesData.map((slide, index) => (
                <SlideInfoWrapper
                    key={`hero-slide-${slide.id}-info-card`}
                    slideData={slide}
                    style={{visibility: indexInView !== index ? 'hidden' : 'visible'}}
                />
            ))}
        </section>
    ) : null;
};