import { useEffect, useRef, memo, useCallback } from 'react';
import { tmdbConfig } from '@/app/constants';
import '../styles.css';

type ComponentProps = {
    slideLogo: string | null;
    slideTitle: string;
    isLogoLoading: boolean;
};

const Title = memo((props: ComponentProps) => {
    const ref = useRef<HTMLHeadingElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const { slideLogo, slideTitle, isLogoLoading } = props;

    const animation = () => {
        if (ref && ref.current) {
            const el = ref.current;
            const titleText = titleRef.current as HTMLHeadingElement;
            const titleImage = imgRef.current as HTMLImageElement;
            const animationTime = parseFloat(getComputedStyle(el).animationDuration) * 1000;

            Object.assign(el.style, {
                animationName: 'title-fadeout',
                animationTimingFunction: 'ease-in',
                animationFillMode: 'forwards'
            });

            setTimeout(() => {
                Object.assign(el, { animation: 'none', opacity: 0 });
                if (slideLogo) {
                    titleImage.src = slideLogo;
                    Object.assign(titleImage.style, { display: 'block', opacity: 0 });
                    titleText.innerHTML = ''
                    titleText.style.display = 'none';
                } else {
                    titleText.innerHTML = slideTitle;
                    titleText.style.display = 'inline';
                    titleImage.src = '';
                    titleImage.style.display = 'none';
                };
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
        if (isLogoLoading) return;
        const img = imgRef.current;
        const title = titleRef.current;
        if (img?.src || title?.innerHTML) {
            if (slideLogo) {
                if (img?.src !== slideLogo) animation();
            } else {
                if (title?.innerHTML !== slideTitle) animation();
            };

        } else {
            if (img && title) {
                if (slideLogo) {
                    img.src = slideLogo;
                    title.innerHTML = '' 
                    title.style.display = 'none';
                    img.style.display = 'block';
                } else {
                    title.innerHTML = slideTitle;
                    title.style.display = 'inline';
                    img.src = '';
                    img.style.display = 'none';
                };
            };
        };
    }, [slideLogo]);

    const showImage = useCallback(() => {
        if (!imgRef || !imgRef.current) return;
        Object.assign(imgRef.current.style, { opacity: '100%' });
    }, [imgRef]);

    return (
        <div ref={ref} className='title-animation-box'>
            {/* titulo em text caso nenhuma imagem de logo do filme ou series esteja disponivel */}
            <h2 ref={titleRef} id='title-text' className="text-3xl sm:text-4xl sm:text-start font-black text-secondary text-center line-clamp-1 font-raleway md:text-5xl truncate max-w-8/12 md:leading-14 md:pointer-events-auto sm:max-w-[530px] md:hover:max-w-none hidden" />
            {/* imagem de logo  */}
            <img
                id='title-image'
                alt={`${slideTitle}'s logo image`}
                className='max-h-[12vh] max-w-[75vw] h-full sm:max-h-[20vh] sm:max-w-[50vw] md:max-w-[40vw] md:max-h-[25vh] lg:max-h-[30vh] xl:max-w-[35vw] 2xl:max-h-[40vh] 2xl:max-w-[40vw] w-fit hidden opacity-0' loading='eager'
                ref={imgRef}
                style={{ filter: 'brightness(170%)' }}
                onLoad={showImage}
            />
        </div>
    );
});

Title.displayName = 'HeaderSlideTitle';
export default Title;