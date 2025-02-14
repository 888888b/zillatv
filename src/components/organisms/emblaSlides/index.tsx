import { ReactNode, useCallback, useEffect, memo } from "react";

import useEmblaCarousel from "embla-carousel-react";
import DefaultNavigation from "@/components/molecules/emblaDefaultNavigation";
import HeaderNavigation from "@/components/molecules/emblaHeaderNavigation";

import { useDotButton } from "@/components/hooks/embla/useDotButton";
import { usePrevNextButtons } from "@/components/hooks/embla/usePrevNextButtons";

import autoplay from 'embla-carousel-autoplay';

import './styles.css';

type EmblaCarouselProps = {
    children: ReactNode[] | ReactNode;
    loop?: boolean;
    slidesPerView?: 'auto' | number;
    duration?: number;
    autoplay?: boolean;
    navigationType: 'default' | 'header';
    dragFree?: boolean
};

export type EmblaStateProps = {
    isBeginning: boolean; 
    isOver: boolean;
    numberOfSlides: number;
    activeIndex: number;
};

const EmblaCarousel = memo(( props: EmblaCarouselProps ) => {

    const emblaConfig = { 
        loop: props.loop, 
        slidesToScroll: props.slidesPerView, 
        duration: 0,
        dragFree: props.dragFree
    };

    const emblaPlugins = props.autoplay ? [
        autoplay({delay: 7000, stopOnInteraction: false})
    ] : [];

    const [emblaRef, emblaApi] = useEmblaCarousel( emblaConfig, emblaPlugins );
    const { 
        selectedIndex, 
        scrollSnaps, 
        onDotButtonClick 
    } = useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    useEffect(() => {
        if ( emblaApi ) {
            // props.autoplay && emblaApi.reInit({}, [autoplay({delay: 7000, stopOnInteraction: false})]);
            emblaApi.on('slidesChanged', () => scrollToIndex( 0 ));
        };
    }, [ emblaApi ]);

    const scrollToIndex = useCallback(( index: number ) => {
        if ( emblaApi ) {
            emblaApi.scrollTo( index )
        };
    }, [ emblaApi ]);

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
                    />
                )}

            </div>
        </div>
    );
});

EmblaCarousel.displayName = 'EmblaCarousel';
export default EmblaCarousel;