// components
import { DotButton } from "@/components/atoms/dotButton";
import NextSlide from '@/components/molecules/nextSlideButton';
import PrevSlide from '@/components/molecules/prevSlideButton';

// hooks
import { memo, useRef, useEffect } from "react";
import './styles.css';

// tipos
import { UseDotButtonType } from "@/components/hooks/embla/useDotButton";

type PrevNextButtonsType = {
    onPrevButtonClick: () => void;
    onNextButtonClick: () => void;
    onReset: () => void;
    isAutoplayActive: boolean;
};

type HeaderNavigationProps = 
UseDotButtonType & 
PrevNextButtonsType & 
{
    isAutoplayActive: boolean;
    timeUntilNextSlide: number | null;
}

const HeaderNavigation = memo(( props: HeaderNavigationProps ) => {

    const bulletsBarRef = useRef<HTMLDivElement>(null);
    const {
        onPrevButtonClick,
        onNextButtonClick,
        scrollSnaps,
        selectedIndex,
        onDotButtonClick,
        isAutoplayActive,
        timeUntilNextSlide,
        onReset
    } = props;

    useEffect(() => {
        const bulletsBar = bulletsBarRef.current;
        if (!bulletsBar) return;

        const width = bulletsBar.clientWidth / 2;
        Object.assign(bulletsBar.style, {transform: `translateX(${width}px)`});
    }, [scrollSnaps]);

    // ir ao slide anterior
    const navigateToPrevSlide = () => {
        onPrevButtonClick();
        onReset();
    };

    // navegar ao proximo slide
    const navigateToNextSlide = () => {
        onNextButtonClick();
        onReset();
    };

    return (
        <>
            {/* Botão para o slide anterior */}
            
            <PrevSlide onClick={navigateToPrevSlide} className="absolute top-1/2 -translate-y-[calc(50%+30px)] left-[8px] lg:left-[22px] bg-primary/70 hover:bg-primary"/>

            {/* barra de bullets de navegaçao */}
            <div ref={bulletsBarRef} className="bullets-bar">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={`bullet ${selectedIndex === index && (isAutoplayActive ? 'active-animated-bullet' : 'active-bullet')}`}
                    />
                ))}
            </div>

            {/* Botão para o proximo slide */}
            <NextSlide onClick={navigateToNextSlide} className="absolute top-1/2 -translate-y-[calc(50%+30px)] right-[8px] lg:right-[22px] bg-primary/70 hover:bg-primary"/>
        </>
    )
});

HeaderNavigation.displayName = 'HeaderNavigation';
export default HeaderNavigation;