import { useEffect, useRef, memo, useCallback } from 'react';
import { tmdbConfig } from '@/app/constants';
import '../styles.css';

type ComponentProps = {
    slideLogo: string | null;
    slideTitle: string;
};

const Title = memo((props: ComponentProps) => {
    const ref = useRef<HTMLHeadingElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const { slideLogo, slideTitle } = props;
    const { ImageBasePath } = tmdbConfig;
    const logoPath = ImageBasePath + '/w500' + slideLogo;

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
                    titleImage.src = logoPath;
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
        if (imgRef.current?.src || titleRef.current?.innerHTML) {
            animation();
        } else {
            if (imgRef && imgRef.current && titleRef && titleRef.current) {
                if (slideLogo) {
                    imgRef.current.src = logoPath;
                    Object.assign(imgRef.current.style, { display: 'block', opacity: 0 });
                    titleRef.current.innerHTML = '' 
                    titleRef.current.style.display = 'none';
                } else {
                    titleRef.current.innerHTML = slideTitle;
                    titleRef.current.style.display = 'inline';
                    imgRef.current.src = '';
                    imgRef.current.style.display = 'none';
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
            <h2 ref={titleRef} id='title-text' className="text-3xl sm:text-4xl sm:text-start font-black text-secondary text-center line-clamp-1 font-raleway md:text-5xl truncate max-w-8/12 md:leading-14 md:pointer-events-auto sm:max-w-[530px] md:hover:max-w-none " />
            {/* imagem de logo  */}
            <img
                id='title-image'
                alt={`${slideTitle}'s logo image`}
                className='max-h-[12vh] max-w-[75vw] h-full sm:max-h-[20vh] sm:max-w-[50vw] md:max-w-[40vw] md:max-h-[25vh] lg:max-h-[30vh] xl:max-w-[35vw] 2xl:max-h-[40vh] 2xl:max-w-[40vw] w-fit' loading='eager'
                ref={imgRef}
                style={{ filter: 'brightness(170%)' }}
                onLoad={showImage}
            />
        </div>
    );
});

Title.displayName = 'HeaderSlideTitle';
export default Title;