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
                <div className="prev-slide-button absolute left-0 top-0 z-50 flex items-center justify-center md:bg-background/80 w-5 sm:w-10 lg:w-16 h-full">
                    <div className="embla-navigation">
                        <PrevSlide onClick={props.onPrevButtonClick}/>
                    </div>
                </div>
            }

            {/* Botão para o proximo slide */}
            {!props.nextBtnDisabled &&
                <div className="next-slide-button absolute right-0 top-0 z-50 flex items-center justify-center md:bg-background/80 w-5 sm:w-10 lg:w-16 h-full">
                    <div className='embla-navigation'>
                        <NextSlide onClick={props.onNextButtonClick}/>
                    </div>
                </div>
            }
        </>
    );
});

EmblaNavigation.displayName = 'EmblaNavigation';
export default EmblaNavigation;