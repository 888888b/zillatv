// hook
import { memo } from "react";
// componentes
import { ArrowLeft } from "@/components/atoms/arrowLeftIcon";
import { ArrowRight } from "@/components/atoms/arrowRightIcon";
import { UsePrevNextButtonsType } from "@/hooks/embla/usePrevNextButtons";
import { DotButton } from "@/components/atoms/dotButton";
// tipos
import { UseDotButtonType } from "@/hooks/embla/useDotButton";
type ComponentProps = UsePrevNextButtonsType & UseDotButtonType;

import './styles.css';

const EmblaNavigation = memo((props: ComponentProps) => {
    const {
        onNextButtonClick,
        onPrevButtonClick,
        nextBtnDisabled,
        scrollSnaps,
        onDotButtonClick,
        selectedIndex
    } = props;

    return (
        <div className="default-navigation">
            {/* barra de bullets de navegaçao */}
            <div className="bullets-bar">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={`bullet ${selectedIndex === index && 'active-bullet'}`}
                    />
                ))}
            </div>
            {/* Botão para o slide anterior */}
            {!props.prevBtnDisabled &&
                <div className="prev-slide-box absolute left-0 top-0 z-50 flex items-center justify-center w-[var(--page-padding)] h-full">
                    <div className="navigation-controlls" onClick={onPrevButtonClick}>
                        <ArrowLeft width={35} height={35} stroke="1.7" />
                    </div>
                </div>
            }

            {/* Botão para o proximo slide */}
            {!nextBtnDisabled &&
                <div className="next-slide-box absolute right-0 top-0 z-50 flex items-center justify-center w-[var(--page-padding)] h-full">
                    <div className='navigation-controlls' onClick={onNextButtonClick}>
                        <ArrowRight width={35} height={35} stroke="1.7" />
                    </div>
                </div>
            }
        </div>
    );
});

EmblaNavigation.displayName = 'EmblaNavigation';
export default EmblaNavigation;