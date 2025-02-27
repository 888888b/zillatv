import { UseDotButtonType } from "@/components/hooks/embla/useDotButton";
import { DotButton } from "@/components/atoms/dotButton";

import { memo } from "react";

type PrevNextButtonsType = {
    onPrevButtonClick: () => void
    onNextButtonClick: () => void
};

type HeaderNavigationProps = UseDotButtonType & PrevNextButtonsType;

const HeaderNavigation = memo(( props: HeaderNavigationProps ) => {
    
    return (
        <div className="absolute bottom-1 md:bottom-3 left-1/2 -translate-x-1/2 box-border flex items-center justify-center mb-2 z-30 lg:bottom-40">
            {/* Botão para o slide anterior */}
            <button 
                onClick={props.onPrevButtonClick}
                className='absolute w-6 h-6 bg-white rounded-full z-30 -translate-x-24 translate-y-[1px] cursor-pointer items-center justify-center hidden md:flex outline-none border-none'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* bullets here  */}
            <div className="flex gap-x-2">
                {props.scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => props.onDotButtonClick(index)}
                        className="w-2 h-2 rounded-full border-none outline-none"
                        style={{ backgroundColor: index === props.selectedIndex ? 'white' : 'rgba(255, 255, 255, 0.2)' }}
                    />
                ))}
            </div>

            {/* Botão para o proximo slide */}
            <button 
                onClick={props.onNextButtonClick}
                className='absolute w-6 h-6 bg-white rounded-full z-30 translate-x-24 cursor-pointer items-center justify-center translate-y-[1px] hidden md:flex outline-none border-none'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5  text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    )
});

HeaderNavigation.displayName = 'HeaderNavigation';
export default HeaderNavigation;