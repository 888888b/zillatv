'use client';

// hooks
import { useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';

// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import PlayButton from '@/components/molecules/playButton';
import AddToListButton from '@/components/molecules/addToListButton';
import Title from './title';
import Description from './description';
import Genres from './genres';
import dynamic from 'next/dynamic';
const SlideImage = dynamic(() => import('../../atoms/heroImage/index'), { ssr: true });

// icons
import { FaPlay } from "react-icons/fa";

import './styles.css';

// contexto
import { GlobalEventsContext } from '@/contexts/globalEventsContext';

// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';
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

    const { push } = useRouter();
    const { slidesData, slidesType, currentPage } = props;
    const [currentSlide, setCurrentSlide] = useState<tmdbObjProps | null>(null);
    const [activeSlides, setActiveSlides] = useState<number[]>([]);
    const { dispatch } = useContext(GlobalEventsContext);

    // lida com a nevegaçao entre paginas
    const navigate = useCallback(() => {
        if (!currentSlide || !currentSlide.id) return;
        dispatch({ type: 'IS_LOADING_ACTIVE', payload: true });
        push(`/player/${slidesType}/${currentSlide.id}`);
    }, [slidesType, push, currentSlide]);

    // recebe o index do slide e atualiza a lista de slides ativos
    const getActiveSlide = useCallback((slideInView: number, numberOfSlides: number): void => {
        if (!slidesData) return;
        const prev = slideInView === 0 ? numberOfSlides - 1 : slideInView - 1;
        const next = slideInView === numberOfSlides - 1 ? 0 : slideInView + 1;
        setCurrentSlide({ ...slidesData[slideInView] });
        setActiveSlides([prev, slideInView, next]);
    }, [slidesData]);

    return slidesData ? (
        <section className='hero-carousel'>
            <EmblaCarousel
                navigationType="header"
                slidesPerView={1}
                autoplay={true}
                loop={true}
                activeIndex={getActiveSlide}>

                {/* Gerando slides apartir da resposta da api do TMDB */}
                {slidesData.map((slide, index) => (
                    // Container da imagem do slide
                    <div
                        key={`${currentPage}-${slide.id}`}
                        className={`embla__slide ${!activeSlides.includes(index) && 'disable-slide'}`}>
                        <SlideImage slideData={slide}/>
                    </div>
                ))}
            </EmblaCarousel>

            {/* detalhes do filme/serie */}
            {currentSlide ? (
                <div className="w-[calc(100%-40px)] sm:w-[calc(100%-80px)] lg:w-[calc(100%-128px)] absolute left-1/2 -translate-x-1/2 bottom-11 flex flex-col items-center gap-y-4 z-[10] pointer-events-none md:pointer-events-auto sm:bottom-1/2 sm:translate-y-[calc(50%-28px)] sm:items-start">
                    {/* titulo */}
                    <Title title={currentSlide.title ?? currentSlide.name} className='text-center sm:text-left'/>
                    {/* descrição do filme / serie */}
                    <Description description={currentSlide.overview}/>
                    <div className='flex items-center justify-center gap-x-4 flex-nowrap'>
                        {/* Ir para pagina de detalhes */}
                        <PlayButton onClick={navigate}>
                            <FaPlay className='text-base'/>
                            Assistir
                        </PlayButton>
                        {/* adicionar filme/serie aos favoritos */}
                        <AddToListButton className='opacity-70 hover:opacity-100'/>
                    </div>
                    {/* lista os generos do filme/serie */}
                    <Genres genresList={currentSlide.genres} />
                </div>
            ) : null}
        </section>
    ) : null;
};