import {useRef} from 'react';
import '../styles.css';

type ComponentProps = { title: string, className?: string };

const Title = (props: ComponentProps) => {
    const ref = useRef<HTMLHeadingElement | null>(null);
    const { title, className } = props;

    return (
        <h2 ref={ref} className={`[font-size:clamp(2.18rem,7vw,3rem)] font-black font-raleway text-secondary line-clamp-2 sm:max-w-[80%] lg:[font-size:clamp(3rem,5vw,5rem)] lg:max-w-[60%] ${className}`}>
            {title}
        </h2>
    );
};

export default Title;