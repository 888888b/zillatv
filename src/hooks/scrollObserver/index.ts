import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            },
            {
                rootMargin: "250px"
            }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [callback]);

    return ref;
};
