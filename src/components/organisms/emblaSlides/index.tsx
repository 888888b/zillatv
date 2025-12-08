// hooks
import { ReactNode, useCallback, useEffect, memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useDotButton } from "@/hooks/embla/useDotButton";
import { usePrevNextButtons } from "@/hooks/embla/usePrevNextButtons";
import { useAutoplayProgress } from "@/hooks/embla/useAutoplayProgress";
// componentes
import DefaultNavigation from "@/components/molecules/emblaDefaultNavigation";
import HeaderNavigation from "@/components/molecules/emblaHeaderNavigation";
// plugins do embla
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from "embla-carousel-class-names";
import Fade from 'embla-carousel-fade';

import './styles.css';
// tipos
type EmblaCarouselProps = {
    children: ReactNode;
    loop?: boolean;
    slidesPerView?: 'auto' | number;
    duration?: number;
    autoplay?: boolean;
    navigationType: 'default' | 'header' | 'featured';
    dragFree?: boolean;
    fadeAnimation?: boolean;
    breakpoints?: Record<string, any>;
    align?: 'start' | 'center' | 'end';
    selectedSnap?: (index: number) => void;
}
export type EmblaStateProps = {
    isBeginning: boolean
    isOver: boolean
    numberOfSlides: number
    activeIndex: number
};

const EmblaCarousel = memo((props: EmblaCarouselProps) => {
    // configuraçoes do carousel
    const { selectedSnap } = props;
    const emblaConfig = {
        loop: props.loop,
        slidesToScroll: props.slidesPerView,
        duration: props.duration ?? 25,
        dragFree: props.dragFree,
        breakpoints: props.breakpoints,
        align: props.align ?? 'center'
    };
    // plugins
    const emblaPlugins = [ClassNames()];
    if (props.autoplay) emblaPlugins.push(Autoplay({ delay: 7000, stopOnInteraction: false }));
    if (props.fadeAnimation) emblaPlugins.push(Fade());
    // ref e api do embla
    const [
        emblaRef,
        emblaApi
    ] = useEmblaCarousel({...emblaConfig}, emblaPlugins);
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

    const scrollToIndex = useCallback((index: number): void => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const resetAutoplayTimer = useCallback((): void => {
        if (!emblaApi) return;
        const plugins = emblaApi.plugins();
        if (plugins && plugins.autoplay) plugins.autoplay.reset();
    }, [emblaApi]);

    const returnToBeggining = useCallback((): void => {
        scrollToIndex(0);
    }, [scrollToIndex]);

    // disponibilizar o slide ativo para camadas superiores
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('slidesChanged', returnToBeggining);
        return () => {emblaApi.off('slidesChanged', returnToBeggining)};
    }, [emblaApi, returnToBeggining]);

    useEffect(() => {
        if (selectedSnap) selectedSnap(selectedIndex);
    }, [selectedIndex, selectedIndex]);

    return (
        <div>
            <div className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {props.children}
                    </div>
                </div>

                {(  
                    props.navigationType === 'default' || 
                    props.navigationType === 'featured'
                ) ? (
                    <DefaultNavigation
                        scrollSnaps={scrollSnaps}
                        selectedIndex={selectedIndex}
                        onDotButtonClick={onDotButtonClick}
                        onNextButtonClick={onNextButtonClick}
                        onPrevButtonClick={onPrevButtonClick}
                        prevBtnDisabled={prevBtnDisabled}
                        nextBtnDisabled={nextBtnDisabled}
                        isBulletBarActive={
                            props.navigationType === 'default' ? true : false
                        }
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