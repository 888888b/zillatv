// components
import { DotButton } from "@/components/atoms/dotButton";
import NextSlide from '@/components/molecules/nextSlideButton';
import PrevSlide from '@/components/molecules/prevSlideButton';
import { ArrowLeft } from "@/components/atoms/arrowLeftIcon";
import { ArrowRight } from "@/components/atoms/arrowRightIcon";

// hooks
import { memo, useRef, useEffect, useCallback } from "react";
import './styles.css';

// tipos
import { UseDotButtonType } from "@/hooks/embla/useDotButton";

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

const HeaderNavigation = memo((props: HeaderNavigationProps) => {

    const bulletsBarRef = useRef<HTMLDivElement>(null);
    const {
        onPrevButtonClick,
        onNextButtonClick,
        scrollSnaps,
        selectedIndex,
        onDotButtonClick,
        isAutoplayActive,
        onReset
    } = props;

    useEffect(() => {
        const bulletsBar = bulletsBarRef.current;
        if (!bulletsBar) return;

        const width = bulletsBar.clientWidth / 2;
        Object.assign(bulletsBar.style, { transform: `translateX(${width}px)` });
    }, [scrollSnaps]);

    // ir ao slide anterior
    const navigateToPrevSlide = useCallback(() => {
        onPrevButtonClick();
        onReset();
    }, [onReset, onPrevButtonClick]);

    // navegar ao proximo slide
    const navigateToNextSlide = useCallback(() => {
        onNextButtonClick();
        onReset();
    }, [onReset, onNextButtonClick]);

    return (
        <>
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

            <div className="hidden absolute bottom-24 right-10 lg:right-16 md:flex items-center justify-center translate-y-1 *:text-secondary/50 *:hover:text-secondary *:hover:scale-125 *:transition-all *:duration-300 *:cursor-pointer z-10">
                {/* Botão para o slide anterior */}
                <div onClick={navigateToNextSlide}>
                    <ArrowLeft width={24} height={24} stroke="1.7" />
                </div>
                {/* Botão para o proximo slide */}
                <div onClick={navigateToNextSlide}>
                    <ArrowRight width={24} height={24} stroke="1.7" />
                </div>
            </div>
        </>
    )
});

HeaderNavigation.displayName = 'HeaderNavigation';
export default HeaderNavigation;