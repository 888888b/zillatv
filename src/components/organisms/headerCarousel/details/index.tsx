// hooks
import { useEffect, useRef, useState, memo } from 'react';

// funções utilitarias
import { getReleaseDate } from '@/components/utils/tmdbApiData/releaseDate';
import { getRunTime } from '@/components/utils/tmdbApiData/runtime';
import { getImdbReviews } from '@/components/utils/tmdbApiData/reviews';
import { tmdbObjProps } from '@/contexts/tmdbContext';

const DetailsBar = memo(({slideData} : {slideData: tmdbObjProps}) => {
    const ref = useRef<HTMLUListElement>(null);
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
        <ul ref={ref} className='flex gap-x-3 text-text font-medium items-center flex-wrap justify-center sm:justify-start text-base sm:max-w-2xl'>
                { slide &&
                    <>
                        {/* data de lançamento */}
                        <li>
                            {getReleaseDate(slide.release_date ?? slide.first_air_date)}
                        </li>

                        {/* separador */}
                        {slide.runtime &&
                            <li className='w-1 h-1 rounded-full bg-text *:whitespace-nowrap' />
                        }

                        {/* tempo de duração */}
                        {slide.runtime ?
                            <li>
                                {getRunTime(slide.runtime)}
                            </li>
                        : null}

                        {/* separador */}
                        <li className='w-1 h-1 rounded-full bg-text *:whitespace-nowrap' />

                        {/* avaliação */}
                        <li className='hidden sm:block'>
                            {getImdbReviews(slide.vote_average, slide.vote_count)}
                        </li>

                        {/* generos */}
                        <li className='text-center'>
                            {slide.genres.map((genre: any) => (
                                genre.name
                            )).join(', ')}
                        </li> 
                    </>
                }
        </ul>
    );
});

DetailsBar.displayName = 'DetailsBar';
export default DetailsBar;