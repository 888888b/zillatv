'use client';
// hooks
import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import SlideInfoWrapper from './slideInfoWrapper'
import Image from './image';
// tipos
import { TmdbMediaProps } from '@/app/types';
import { Path } from '@/utils/tmdbApiData/getLogoPath';
type HeaderCarouselProps = {
    currentPage: 'home' | 'movies' | 'series';
    slidesData: TmdbMediaProps[] | undefined
};
// utilitarios
import { getLogoPath } from '@/utils/tmdbApiData/getLogoPath';
import { loadAllLogos } from '@/utils/tmdbApiData/loadAllLogos';
import { tmdbConfig } from '@/app/constants';

import './styles.css';

export default function HeroCarousel(props: HeaderCarouselProps) {
    const { slidesData } = props;
    const ref = useRef<HTMLElement | null>(null);
    const [width, setWidth] = useState(0);
    const imageQuality = (width <= 768) ? 'low' : (width <= 1280 ? 'medium' : 'high');
    const [indexInView, setIndexInView] = useState(0);
    const {
        low_resolution_backdrop,
        high_resolution_backdrop,
        high_resolution_poster,
        medium_resolution_backdrop,
        medium_resolution_poster
    } = tmdbConfig;

    const getPath = useCallback((media: TmdbMediaProps, quality: "low" | "medium" | "high"): string => {
        if (media.backdrop_path) {
            if (quality === 'low') return low_resolution_backdrop + media.backdrop_path;
            if (quality === 'medium') return medium_resolution_backdrop + media.backdrop_path;
            return high_resolution_backdrop + media.backdrop_path;
        } else {
            if (quality === 'low') return medium_resolution_poster + media.poster_path;
            if (quality === 'medium') return high_resolution_poster + media.poster_path;
            return high_resolution_poster + media.poster_path;
        };
    }, []);

    const slides = useMemo(() => {
        return slidesData?.map((slide, index) => (
            <div key={`hero-slide-${slide.id}`} className="embla__slide">
                <Image
                    lowSrc={getPath(slide, "low")}
                    highSrc={getPath(slide, imageQuality)}
                    indexInView={indexInView}
                    imageIndex={index}
                    className="slide-img"
                />
            </div>
        ));
    }, [slidesData, getPath, indexInView, width]);
    const activeSlideData = slidesData && slidesData[indexInView];

    // recebe o index do slide ativo na tela
    const getIndexInView = useCallback((index: number): void => {
        setIndexInView(index);
    }, [setIndexInView]);

    useEffect(() => {
        if (!slidesData) return;
        (async () => {
            const logos: Path[] = [];
            slidesData.forEach(slide => {
                const logo = getLogoPath(slide.images.logos, slide.id);
                logo && logos.push(logo);
            });
            await loadAllLogos(logos);
        })();
    }, [slidesData]);

    useEffect(() => {
        if (window !== undefined) setWidth(window.innerWidth);
    }, []);

    return slidesData ? (
        <section ref={ref} className='hero-carousel'>
            <EmblaCarousel
                navigationType="header"
                slidesPerView={1}
                autoplay={true}
                loop={true}
                duration={15}
                fadeAnimation={true}
                selectedSnap={getIndexInView}>
                {slides}
            </EmblaCarousel>
            {/* Informações sobre o filme/Serie exp:(Titulo, Imagem, Descrição, Generos...) */}
            <SlideInfoWrapper slideData={activeSlideData} />
        </section>
    ) : null;
};