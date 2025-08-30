import {useRef} from 'react';
import '../styles.css';

type ComponentProps = { title: string, className?: string };

const Title = (props: ComponentProps) => {
    const ref = useRef<HTMLHeadingElement | null>(null);
    const { title, className } = props;

    return (
        <h2 ref={ref} className={`text-[35px] leading-9 font-black font-raleway text-secondary line-clamp-1 max-w-full sm:text-5xl md:hover:max-w-full sm:leading-16 lg:max-w-[900px]  lg:text-6xl lg:leading-20 ${className}`}>
            {title}
        </h2>
    );
};

export default Title;