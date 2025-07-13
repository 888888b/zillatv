import { useEffect, useRef, memo } from 'react';
import '../styles.css';

const Title = memo(({ title }: { title: string }) => {
    const ref = useRef<HTMLHeadingElement>(null);
    
    const animation = () => {
        if ( ref && ref.current ) {
            const el = ref.current;
            const animationTime = parseFloat(getComputedStyle(el).animationDuration) * 1000;

            Object.assign(el.style, {
                animationName: 'title-fadeout',
                animationTimingFunction: 'ease-in',
                animationFillMode: 'forwards'
            });

            setTimeout(() => {
                Object.assign(el, {
                    innerText: title,
                    animation: 'none',
                    opacity: 0
                });
            }, animationTime + 10);

            setTimeout(() => {
                Object.assign(el.style, {
                    animationName: 'title-fadein',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards'
                });
            }, animationTime + 40);
        };
    };

    useEffect(() => {
        animation();
    }, [title]);

    return (
        <h2 ref={ref} className="text-3xl md:duration-300 sm:text-4xl sm:text-start font-black text-secondary text-center line-clamp-1 font-raleway md:text-5xl truncate max-w-8/12 md:leading-14 sm:max-w-2xl"/>  
    );
});

Title.displayName = 'HeaderSlideTitle';
export default Title;