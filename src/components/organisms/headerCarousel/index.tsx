'use client';
// hooks
import {
    useState,
    useCallback,
    useRef,
    useMemo,
    useEffect,
} from 'react';
// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import SlideInfoWrapper from './slideInfoWrapper'
import Image from './image';
import SlideInfoSkeleton from './slideInfoSkeleton';
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
import { Path } from '@/utils/tmdb/getLogoPath';
type HeaderCarouselProps = {
    currentPage: 'home' | 'movies' | 'series';
    slidesData: TmdbMediaProps[] | undefined;
    lang: string;
};
// utilitarios
import { getLogoPath } from '@/utils/tmdb/getLogoPath';
import { loadAllLogos } from '@/utils/tmdb/loadAllLogos';
import { tmdbConfig } from '@/app/[lang]/constants';

import './styles.css';

export default function HeroCarousel(props: HeaderCarouselProps) {
    const { lang } = props;
    const langCode = lang.split('-')[0];
    const ref = useRef<HTMLElement | null>(null);
    const [width, setWidth] = useState(0);
    const {
        low_resolution_backdrop,
        high_resolution_backdrop,
        high_resolution_poster,
        medium_resolution_backdrop,
        medium_resolution_poster
    } = tmdbConfig;
    const [slidesData, setSlidesData] = useState(props.slidesData);
    const [isLoading, setIsLoading] = useState(true);

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
        const quality =
            width <= 768 ? "low" :
                width <= 1600 ? "medium" :
                    "high";

        if (width === 0) return null;
        return slidesData?.map(slide => (
            <div key={`hero-slide-${slide.id}`} className="embla__slide">
                <div className='img-wrapper'>
                    <Image
                        src={getPath(slide, quality)}
                        className="slide-img"
                        alt={`Imagem poster de ${slide.name ?? slide.title}`}
                    />
                </div>
                {/* Informações sobre o filme/Serie exp:(Titulo, Imagem, Descrição, Generos...) */}
                { !isLoading ?
                    <SlideInfoWrapper
                        data={slide}
                        lang={lang}
                        key={`hero-slide-${slide.id}-info`}
                        logo={slide.logo}
                        pageWidth={width}
                    />
                    :
                    <SlideInfoSkeleton/>
                }
            </div>
        ));
    }, [slidesData, width, lang, isLoading]);

    // carrega as logos dos filmes/series e adiciona aos dados do carousel 
    useEffect(() => {
        if (!slidesData) return;

        const addLogos = (logos: (Path | undefined)[]) => {
            const updateData = slidesData.map((data, index) => (
                { ...data, logo: logos[index] }
            ));
            setSlidesData([...updateData]);
            setIsLoading(false);
        };

        (async () => {
            const logos = slidesData.map(slide => {
                return getLogoPath(slide.images.logos, slide.id, langCode);
            });
            await loadAllLogos(logos.filter(logo => logo !== undefined));
            addLogos(logos);
        })();
    }, [lang]);

    // pega o width total da viewport
    useEffect(() => {
        if (typeof window === "undefined") return;
        const setCurrentWidth = () => {
            if (!window) return;
            setWidth(window.innerWidth);
        };
        setCurrentWidth();
        window.addEventListener('resize', setCurrentWidth);
        return () => { window.removeEventListener('resize', setCurrentWidth) };
    }, []);

    return slidesData ? (
        <section ref={ref} className='hero-carousel'>
            <EmblaCarousel
                navigationType="header"
                slidesPerView={1}
                autoplay={true}
                loop={true}
                breakpoints={{
                    '(min-width: 1px)': { duration: 10 },
                    '(min-width: 1024px)': { duration: 15 },
                }}
                fadeAnimation={true}>
                {slides}
            </EmblaCarousel>
        </section>
    ) : null;
};