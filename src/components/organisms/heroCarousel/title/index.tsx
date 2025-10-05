import { ComponentPropsWithRef, memo } from 'react';

const Title = memo((props: ComponentPropsWithRef<'h1'>) => {
    const {className, ...rest} = props;
    return (
        <h1 {...rest} className={`[font-size:clamp(2.5rem,5vw,5rem)] text-center sm:text-left font-black font-raleway text-secondary line-clamp-2 sm:line-clamp-1 sm:max-w-[80%] xl:max-w-[60%] uppercase ${className}`}/>
    );
});
Title.displayName = 'HeroSlideTitle';
export default Title;