import { memo } from "react";

import { UsePrevNextButtonsType } from "@/components/hooks/embla/usePrevNextButtons";

const EmblaNavigation = memo(( props: UsePrevNextButtonsType ) => {
    return (
        <>
            {/* Botão para o slide anterior */ }
            <div 
                className="w-16 h-full absolute left-0 top-0 z-50 flex items-center justify-start bg-gradient-to-l from-transparent to-deepnight embla-navigation"
                style={{
                    opacity: props.prevBtnDisabled ? '0' : '100%',
                    pointerEvents: props.prevBtnDisabled ? 'none' : 'auto'
                }}>
                <button
                    onClick={props.onPrevButtonClick}
                    className={`w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-white cursor-pointer -translate-x-8`}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>

            {/* Botão para o proximo slide */ }
            <div 
                className="w-16 h-full absolute right-0 top-0 z-50 flex items-center justify-end bg-gradient-to-r from-transparent to-deepnight embla-navigation"
                style={{
                    opacity: props.nextBtnDisabled ? '0' : '100%',
                    pointerEvents: props.nextBtnDisabled ? 'none' : 'auto'
                }}>
                <button
                    onClick={props.onNextButtonClick}
                    className={`w-8 h-8 rounded-full bg-white hover:bg-white cursor-pointer embla-navigation translate-x-8`}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </>
    );
});

EmblaNavigation.displayName = 'EmblaNavigation';
export default EmblaNavigation;