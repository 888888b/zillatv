// hook
import { memo } from "react";
// componentes
import { ArrowLeft } from "@/components/atoms/arrowLeftIcon";
import { ArrowRight } from "@/components/atoms/arrowRightIcon";

import { UsePrevNextButtonsType } from "@/hooks/embla/usePrevNextButtons";

import '@/components/organisms/emblaSlides/styles.css';

const EmblaNavigation = memo((props: UsePrevNextButtonsType) => {
    return (
        <>
            {/* Botão para o slide anterior */}
            {!props.prevBtnDisabled &&
                <div className="prev-slide-box absolute left-0 top-0 z-50 flex items-center justify-center w-5 sm:w-10 lg:w-16 h-full">
                    <div className="navigation-controlls" onClick={props.onPrevButtonClick}>
                        <ArrowLeft width={35} height={35} stroke="1.7" />
                    </div>
                </div>
            }

            {/* Botão para o proximo slide */}
            {!props.nextBtnDisabled &&
                <div className="next-slide-box absolute right-0 top-0 z-50 flex items-center justify-center w-5 sm:w-10 lg:w-16 h-full">
                    <div className='navigation-controlls' onClick={props.onNextButtonClick}>
                        <ArrowRight width={35} height={35} stroke="1.7" />
                    </div>
                </div>
            }
        </>
    );
});

EmblaNavigation.displayName = 'EmblaNavigation';
export default EmblaNavigation;