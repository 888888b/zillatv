// hooks
import { memo, useRef, useCallback } from "react";
// components
import { DotButton } from "@/components/atoms/dotButton";
import { ArrowLeft } from "@/components/atoms/arrowLeftIcon";
import { ArrowRight } from "@/components/atoms/arrowRightIcon";
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
// outros
import './styles.css';

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
            {/* Botão para o slide anterior */}
            <div onClick={navigateToPrevSlide} className="navigation-controlls absolute top-[calc((100%-200px)/2)] -translate-y-1/2 left-5 lg:left-8 -translate-x-1/2 mt-[72px] z-15">
                <ArrowLeft width={35} height={35} stroke="1.7" />
            </div> 
            {/* Botão para o proximo slide */}
            <div onClick={navigateToNextSlide} className="navigation-controlls absolute top-[calc((100%-200px)/2)] -translate-y-1/2 right-5 lg:right-8 translate-x-1/2 mt-[72px] z-15">
                <ArrowRight width={35} height={35} stroke="1.7" />
            </div>
        </>
    )
});

HeaderNavigation.displayName = 'HeaderNavigation';
export default HeaderNavigation;