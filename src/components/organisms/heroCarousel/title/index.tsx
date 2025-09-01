import {useRef} from 'react';
import '../styles.css';

type ComponentProps = { title: string, className?: string };

const Title = (props: ComponentProps) => {
    const ref = useRef<HTMLHeadingElement | null>(null);
    const { title, className } = props;

    return (
        <h2 ref={ref} className={`text-[35px] leading-[38px] font-black font-raleway text-secondary line-clamp-2 sm:max-w-[80%] sm:text-5xl sm:leading-[55px] lg:text-6xl lg:max-w-[60%] lg:leading-[70px] ${className}`}>
            {title}
        </h2>
    );
};

export default Title;