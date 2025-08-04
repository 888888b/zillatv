'use client';

// hooks
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import HeroButton from '@/components/molecules/heroButton';
import Title from './title';
import DetailsBar from './details';
import dynamic from 'next/dynamic';
const SlideImage = dynamic(() => import('../../atoms/heroImage/index'), { ssr: true });

// icons
import { EyeIcon } from "@/components/atoms/eyeIcon";

// funçoes utilitarias 
import { getLogoPath } from '@/utils/tmdbApiData/getLogoPath';

import './styles.css';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';

import { tmdbConfig } from '@/app/constants';

type HeaderCarouselProps = {
    currentPage: string
    slidesType: string
    slidesData: tmdbObjProps[] | undefined
};

export type Path = {
    path: string;
    slide: string;
};

export default function HeaderCarousel(props: HeaderCarouselProps) {

    const { ImageBasePath } = tmdbConfig;
    const { push } = useRouter();
    const { slidesData, slidesType, currentPage } = props;
    const [currentSlide, setCurrentSlide] = useState<tmdbObjProps | null>(null);
    const [activeSlides, setActiveSlides] = useState<number[]>([]);
    const [logos, setLogos] = useState<Path[] | null>(null);
    const [isLogosLoading, setIsLogosLoading] = useState<boolean>(true);

    // lida com a nevegaçao entre paginas
    const navigate = useCallback(() => {
        if (!currentSlide || !currentSlide.id) return;
        push(`/player/${slidesType}/${currentSlide.id}`, {
            scroll: true
        });
    }, [slidesType, push, currentSlide]);

    // recebe o index do slide e atualiza a lista de slides ativos
    const getActiveSlide = useCallback((slideInView: number, numberOfSlides: number): void => {
        if (!slidesData) return;
        const prev = slideInView === 0 ? numberOfSlides - 1 : slideInView - 1;
        const next = slideInView === numberOfSlides - 1 ? 0 : slideInView + 1;
        setCurrentSlide({ ...slidesData[slideInView] });
        setActiveSlides([prev, slideInView, next]);
    }, [slidesData]);

    // pre-carrega as imagens de logo de filmes ou series
    const loadAllLogoImages = useCallback(async () => {
        if (!slidesData) return;

        const logos = slidesData.map(slide => (getLogoPath(slide.images.logos, slide.id))).filter(logo => logo !== undefined);
        const resolvedPaths = await Promise.all(logos.map(logo => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                Object.assign(image, {
                    src: `${ImageBasePath}/w500${logo.path}`,
                    loading: 'eager',
                    onload: () => resolve({ path: image.src, slide: logo.slide }),
                    onerror: () => reject(`Error ao carregar imagem: ${logo.path}`)
                });
            });
        })) as Path[];
        setLogos([...resolvedPaths]);
        setIsLogosLoading(false);
    }, [slidesData, ImageBasePath]);

    useEffect(() => {
        loadAllLogoImages();
    }, [slidesData]);

    // seleciona dentro da lista de logos precarregadas a url de logo do slide atual
    const getSlideLogoPath = useCallback((slideId: string) => {
        const logo = logos?.find(logo => logo.slide === slideId);
        if (!logo?.path) return null;
        return logo.path;
    }, [logos]);

    return slidesData ? (
        <section className='header-slides'>
            <EmblaCarousel
                navigationType="header"
                slidesPerView={1}
                autoplay={true}
                loop={true}
                activeIndex={getActiveSlide}>

                {/* Gerando slides apartir da resposta da api do TMDB */}
                {slidesData.map((slide, index) => (
                    // Container da imagem do slide
                    <SlideImage
                        key={`${currentPage}-${slide.id}`}
                        className={`embla__slide header-image-container ${activeSlides.includes(index) ? 'active-slide' : 'disable-slide'}`}
                        slideData={slide}
                    />
                ))}
            </EmblaCarousel>

            {/* detalhes do filme/serie */}
            {currentSlide ? (
                <div className="absolute left-0 bottom-12 w-full sm:w-fit px-5 flex flex-col items-center justify-between gap-y-4 sm:items-start sm:px-10 sm:bottom-[133px] lg:px-[70px] z-10 pointer-events-none overflow-hidden">
                    {/* titulo */}
                    { logos &&
                        <Title
                            slideLogo={getSlideLogoPath(currentSlide.id)}
                            slideTitle={currentSlide.title ?? currentSlide.name}
                            isLogoLoading={isLogosLoading}
                        />
                    }
                    {/* lista com algumas informaçoes sobre filme/serie */}
                    <DetailsBar slideData={currentSlide} />
                    {/* Ir para pagina de detalhes */}
                    <HeroButton onClick={navigate} className='mt-2'>
                        <EyeIcon className="w-[23px] h-[23px] lg:w-[24px] lg:h-[24px] stroke-2 lg:stroke-[2.2]" />
                        Ver detalhes
                    </HeroButton>
                </div>
            ) : null}
        </section>
    ) : null;
};