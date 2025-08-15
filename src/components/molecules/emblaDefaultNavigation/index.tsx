import { memo } from "react";

import NextSlide from '@/components/molecules/nextSlideButton';
import PrevSlide from '@/components/molecules/prevSlideButton';

import { UsePrevNextButtonsType } from "@/hooks/embla/usePrevNextButtons";

import '@/components/organisms/emblaSlides/styles.css';

const EmblaNavigation = memo((props: UsePrevNextButtonsType) => {
    return (
        <>
            {/* Botão para o slide anterior */}
            {!props.prevBtnDisabled &&
                <div className="absolute left-0 top-0 z-50 flex items-center justify-center bg-background/80 w-5 sm:w-10 lg:w-[70px] h-full">
                    <PrevSlide onClick={props.onPrevButtonClick} className=" bg-primary embla-navigation" />
                </div>
            }

            {/* Botão para o proximo slide */}
            {!props.nextBtnDisabled &&
                <div className="absolute right-0 top-0 z-50 flex items-center justify-center bg-background/80 w-5 sm:w-10 lg:w-[70px] h-full">
                    <NextSlide onClick={props.onNextButtonClick} className="bg-primary embla-navigation" />
                </div>
            }
        </>
    );
});

EmblaNavigation.displayName = 'EmblaNavigation';
export default EmblaNavigation;