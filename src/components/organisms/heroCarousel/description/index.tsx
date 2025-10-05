import { ComponentPropsWithRef, memo } from "react";

const Description = memo((props: ComponentPropsWithRef<'p'>) => {
    const { className, ...rest } = props;
    return (
        <p 
        {...rest} 
        className={`[font-size:clamp(1.125rem,1.3vw,1.25rem)] overflow-ellipsis text-center line-clamp-2 lg:line-clamp-3 sm:max-w-[50%] sm:text-left lg:max-w-[40%] 2xl:max-w-[45%] 2xl:line-clamp-4 ${className}`}
        />
    );
});
Description.displayName = 'HeroSlideDescription';
export default Description;