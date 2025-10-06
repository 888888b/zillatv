'use client';
import { useRef, memo, ComponentPropsWithoutRef, useEffect, useCallback } from 'react';
type ComponentProps = ComponentPropsWithoutRef<'img'> & {
    lowSrc: string;
    highSrc: string;
};

const LazyImage = memo((props: ComponentProps) => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const { className, lowSrc, highSrc, src, ...rest } = props;

    const updateImagePath = useCallback((path: string | undefined) => {
        if (!imageRef.current || !path) return;
        imageRef.current.src = path;
    }, [imageRef]);

    useEffect(() => {
        (async () => {
            const loadPath: string | undefined = await new Promise((resolve, reject) => {
                const image = new Image();
                Object.assign(image, {
                    src: highSrc,
                    loading: 'eager',
                    onload: () => resolve(image.src),
                    onerror: () => reject(`Error ao carregar imagem: ${highSrc}`)
                });
            });
            updateImagePath(loadPath);
        })()
    }, [lowSrc, highSrc]);

    return (
        <img 
        {...rest} 
        src={lowSrc} 
        ref={imageRef} 
        className={`${className}`}
        loading='lazy'
        />
    );
});
LazyImage.displayName = 'HeroPlayerImage';
export default LazyImage;