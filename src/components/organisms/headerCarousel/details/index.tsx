// hooks
import { useEffect, useRef, useState, memo } from 'react';

// funções utilitarias
import { getReleaseDate } from '@/utils/tmdbApiData/releaseDate';
import { getRunTime } from '@/utils/tmdbApiData/runtime';
import { getImdbReviews } from '@/utils/tmdbApiData/reviews';
import { tmdbObjProps } from '@/contexts/tmdbContext';

const DetailsBar = memo(({slideData} : {slideData: tmdbObjProps}) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const [ slide, setSlide ] = useState<tmdbObjProps | null>(null);
    
    const animation = () => {
        if ( ref && ref.current ) {
            const el = ref.current;
            const animationTime = parseFloat(getComputedStyle(el).animationDuration) * 1000;

            Object.assign(el.style, {
                animationName: 'details-fadeout',
                animationTimingFunction: 'ease-in',
                animationFillMode: 'forwards',
                animationDelay: '0.05s'
            });

            setTimeout(() => {
                setSlide(slideData);
                Object.assign(el, {
                    animation: 'none',
                    opacity: 0
                });
            }, animationTime + 60);

            setTimeout(() => {
                Object.assign(el.style, {
                    animationName: 'details-fadein',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards',
                    animationDelay: '0s'
                });
            }, animationTime + 90);
        };
    };

    useEffect(() => {
        animation();
    }, [slideData]);

    return (
        <p ref={ref} className='flex gap-x-3 text-text font-medium items-center flex-nowrap justify-start sm:justify-start text-base max-w-full sm:max-w-2xl truncate line-clamp-1'>
                { slide &&
                    <>
                        {/* data de lançamento */}
                        {getReleaseDate(slide.release_date ?? slide.first_air_date)}

                        {/* separador */}
                        {slide.runtime &&
                            <span className='w-1 h-1 rounded-full bg-text ' />
                        }

                        {/* tempo de duração */}
                        {slide.runtime ?
                            getRunTime(slide.runtime)
                        : null}

                        {/* separador */}
                        <span className='w-1 h-1 rounded-full bg-text' />

                        {/* generos */}
                        <span className='text-center truncate'>
                            {slide.genres.map((genre: any) => (
                                genre.name
                            )).join(', ')}
                        </span> 
                    </>
                }
        </p>
    );
});

DetailsBar.displayName = 'DetailsBar';
export default DetailsBar;