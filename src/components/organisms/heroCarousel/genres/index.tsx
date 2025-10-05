import { ComponentPropsWithRef, memo } from "react";

const Genres = memo((props: ComponentPropsWithRef<'p'>) => {
    const { className, ...rest } = props;
    return (
        <p {...rest} className={`[font-size:clamp(1rem,1.15vw,1.125rem)] line-clamp-1 overflow-ellipsis sm:max-w-[40%] lg:max-w-[30%] md:hover:max-w-none ${className}`}/>
    );
});
Genres.displayName = 'HeroSlideGenres';
export default Genres;