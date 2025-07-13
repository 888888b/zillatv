// hooks
import { ReactNode, useCallback, useEffect, memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useDotButton } from "@/components/hooks/embla/useDotButton";
import { usePrevNextButtons } from "@/components/hooks/embla/usePrevNextButtons";
import { useAutoplayProgress } from "@/components/hooks/embla/useAutoplayProgress";


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
    activeSlide?: ( index: number ) => void;
    scrollSnaps?: ( list: number[] ) => void;
};

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
        duration: 20,
        dragFree: props.dragFree,
        breakpoints: {'(min-width: 768px)': { duration: 25 }}
    };

    // plugins
    const emblaPlugins = props.autoplay ? [
        autoplay({
            delay: 7000, 
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

    // disponibilizar o slide ativo para camadas superiores
    useEffect(() => {
        if (!props.activeSlide || !props.scrollSnaps) return;
        props.activeSlide(selectedIndex);
        props.scrollSnaps(scrollSnaps);
    }, [ selectedIndex, scrollSnaps ]);

    // reiniciar o carousel assim houver mudança nos slides
    useEffect(() => {
        if ( emblaApi ) {
            emblaApi.on('slidesChanged', () => scrollToIndex( 0 ));
        };
        
        return () => {
            if ( emblaApi ) {
                emblaApi.off('slidesChanged', () => scrollToIndex(0));
                emblaApi.destroy();
            };
        };
    }, [ emblaApi ]);   

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