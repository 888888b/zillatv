'use client'
import { useEffect, useState, memo } from 'react';

type Props = React.ComponentPropsWithoutRef<'img'> & {
    lowSrc: string;
    highSrc: string;
    indexInView: number;
    imageIndex: number;
};

const LazyImage = memo((props: Props) => {
    const {
        lowSrc, 
        highSrc, 
        indexInView, 
        imageIndex, 
        className, 
        ...rest
    } = props;
    const [loaded, setLoaded] = useState(false);
    const shouldLoad =
        imageIndex === indexInView ||
        imageIndex + 1 === indexInView ||
        imageIndex - 1 === indexInView;

    useEffect(() => {
        if (!shouldLoad || loaded) return;
        const img = new Image();
        img.src = highSrc;
        img.onload = () => setLoaded(true);
    }, [shouldLoad, loaded, highSrc]);

    return (
        <div className={`relative w-full aspect-video overflow-hidden ${className}`}>
            {/* LOW RES */}
            <img
                {...rest}
                src={lowSrc}
                className={`absolute inset-0 w-full h-full object-cover`}
                loading="lazy"
                decoding="async"
                aria-hidden={loaded ? "true" : "false"}
            />
            {/* HIGH RES */}
            <img
                {...rest}
                src={highSrc}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                loading="eager"
            />
        </div>
    );
});

LazyImage.displayName = "LazyImage";
export default LazyImage;
