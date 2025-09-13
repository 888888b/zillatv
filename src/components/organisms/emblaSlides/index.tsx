// hooks
import { ReactNode, useCallback, useEffect, memo } from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { useDotButton } from "@/hooks/embla/useDotButton";
import { usePrevNextButtons } from "@/hooks/embla/usePrevNextButtons";
import { useAutoplayProgress } from "@/hooks/embla/useAutoplayProgress";

// componentes
import DefaultNavigation from "@/components/molecules/emblaDefaultNavigation";
import HeaderNavigation from "@/components/molecules/emblaHeaderNavigation";

// plugins do embla
import autoplay from 'embla-carousel-autoplay';

import './styles.css';

// tipos

type EmblaCarouselProps = {
    children: ReactNode[] | ReactNode;
    loop?: boolean;
    slidesPerView?: 'auto' | number;
    duration?: number;
    autoplay?: boolean;
    navigationType: 'default' | 'header';
    dragFree?: boolean;
    breakpoints?: Record<string, any>;
    activeSlides?: ( indexList: number[], numberOfSlides: number ) => void;
    activeIndex?: ( index: number, numberOfSlides: number ) => void;
}
export type EmblaStateProps = {
    isBeginning: boolean
    isOver: boolean
    numberOfSlides: number
    activeIndex: number
};

const EmblaCarousel = memo(( props: EmblaCarouselProps ) => {

    // configuraçoes do carousel
    const emblaConfig = { 
        loop: props.loop, 
        slidesToScroll: props.slidesPerView, 
        duration: 25,
        dragFree: props.dragFree,
        breakpoints: props.breakpoints
    };

    // plugins
    const emblaPlugins = props.autoplay ? [
        autoplay({
            delay: 10000, 
            stopOnInteraction: false 
        })
    ] : [];

    // ref e api do embla
    const [
        emblaRef, 
        emblaApi
    ] = useEmblaCarousel( emblaConfig, emblaPlugins );

    // iniciar barra de progresso do autoplay
    const { isAutoplayActive, timeUntilNextSlide } = useAutoplayProgress(emblaApi);

    // iniciar bullets de navegaçao
    const { 
        selectedIndex, 
        scrollSnaps, 
        onDotButtonClick 
    } = useDotButton(emblaApi);

    // iniciar botoes de navegaçao
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    const setSlidesInView = useCallback(() => {
        if (!props.activeSlides || !emblaApi) return;
        const inView = emblaApi.slidesInView();
        const numberOfSlides = emblaApi.slideNodes().length;
        props.activeSlides(inView, numberOfSlides);
    }, [ emblaApi ]);

    const returnToBeggining = useCallback(() => {
        scrollToIndex(0);
    }, []);
  
    // disponibilizar o slide ativo para camadas superiores
    useEffect(() => {
        if ( !props.activeSlides || !emblaApi ) return;
        emblaApi.on('slidesInView', setSlidesInView);
        emblaApi.on('slidesChanged', returnToBeggining);
        setSlidesInView();
        return () => {
            emblaApi.off('slidesInView', setSlidesInView);
            emblaApi.off('slidesChanged', returnToBeggining);
        };
    }, [ emblaApi ]);

    // reiniciar o carousel assim houver mudança nos slides
    useEffect(() => {
        if ( !props.activeIndex || !emblaApi ) return;
        const numberOfSlides = emblaApi.slideNodes().length;
        props.activeIndex(selectedIndex, numberOfSlides);
    }, [ emblaApi, selectedIndex ]);   

    const scrollToIndex = useCallback(( index: number ) => {
        if (emblaApi) {
            emblaApi.scrollTo( index );
        };
    }, [ emblaApi ]);

    const resetAutoplayTimer = useCallback(() => {
        if (emblaApi) {
            emblaApi.plugins().autoplay.reset();  
        };
    }, [emblaApi]);

    return (
        <div>
            <div className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        { props.children }
                    </div>
                </div>

                { props.navigationType === 'default' ? (
                    <DefaultNavigation 
                        onNextButtonClick={onNextButtonClick}
                        onPrevButtonClick={onPrevButtonClick}
                        prevBtnDisabled={prevBtnDisabled}
                        nextBtnDisabled={nextBtnDisabled}
                    />
                ) : (
                    <HeaderNavigation
                    selectedIndex={selectedIndex}
                    scrollSnaps={scrollSnaps}
                    onDotButtonClick={onDotButtonClick}  
                    onNextButtonClick={onNextButtonClick}
                    onPrevButtonClick={onPrevButtonClick}
                    isAutoplayActive={isAutoplayActive}
                    timeUntilNextSlide={timeUntilNextSlide}
                    onReset={resetAutoplayTimer}
                    />
                )}

            </div>
        </div>
    );
});

EmblaCarousel.displayName = 'EmblaCarousel';
export default EmblaCarousel;