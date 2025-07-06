import { memo } from "react";

import NextSlide from '@/components/molecules/nextSlideButton';
import PrevSlide from '@/components/molecules/prevSlideButton';

import { UsePrevNextButtonsType } from "@/components/hooks/embla/usePrevNextButtons";

import '@/components/organisms/emblaSlides/styles.css';

const EmblaNavigation = memo(( props: UsePrevNextButtonsType ) => {
    return (
        <>
            {/* Botão para o slide anterior */ }
            { !props.prevBtnDisabled &&
                <div 
                    className="w-16 h-full absolute left-0 top-0 z-50 bg-gradient-to-r from-background to-background/0 flex items-center justify-start embla-navigation">
                    <PrevSlide onClick={props.onPrevButtonClick} className="bg-primary"/>
                </div>
            }

            {/* Botão para o proximo slide */ }
            { !props.nextBtnDisabled &&
                <div 
                    className="w-16 h-full absolute right-0 top-0 z-50 bg-gradient-to-r from-transparent to-background flex items-center justify-end embla-navigation">
                    <NextSlide onClick={props.onNextButtonClick} className="bg-primary"/>
                </div>
            }
        </>
    );
});

EmblaNavigation.displayName = 'EmblaNavigation';
export default EmblaNavigation;