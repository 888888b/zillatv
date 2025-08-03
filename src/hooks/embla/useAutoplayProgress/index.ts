import { useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type AutoplayProgress = {
    isAutoplayActive: boolean;
    timeUntilNextSlide: number | null;
};

type AutoplayState = {
    isActive: boolean;
};

export const useAutoplayProgress = (
    emblaApi: EmblaCarouselType | undefined
): AutoplayProgress => {
    const [isAutoplayActive, setIsAutoplayActive] = useState(false)
    const [timeUntilNextSlide, setTimeUntilNextSlide] = useState<number | null>(null)

    const setAutoplayState = (props: AutoplayState ): void => {
        const autoplay = emblaApi?.plugins().autoplay;
        const time = autoplay?.timeUntilNext();
        const isActive = props.isActive;

        if (!autoplay || !time || !isActive) {
            setTimeUntilNextSlide(null);
            setIsAutoplayActive(false); 
            return;
        };

        const seconds = parseFloat((time / 1000).toFixed(1));
        setTimeUntilNextSlide(seconds);
        setIsAutoplayActive(true);
    };

    useEffect(() => {
        const embla = emblaApi;
        if (!embla) return;

        emblaApi
            .on('autoplay:timerset', () => setAutoplayState({isActive: true}))
            .on('autoplay:timerstopped', () => setAutoplayState({isActive: false}));
    }, [emblaApi]);

    return {
        isAutoplayActive,
        timeUntilNextSlide,
    };
}
