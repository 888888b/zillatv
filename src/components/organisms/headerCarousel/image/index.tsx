import { ComponentPropsWithRef, memo } from "react"
import { tmdbConfig } from "@/app/constants";
import { tmdbObjProps } from "@/contexts/tmdbContext";

type ComponentProps = ComponentPropsWithRef<'div'> & {
    slideData: tmdbObjProps
};

const Image = memo(( props: ComponentProps ) => {
    const { slideData, className, ...rest } = props;
    // urls para imagens
    const {
        high_resolution_backdrop,
        high_resolution_poster
    } = tmdbConfig;

    return (
        /* container da imagem */
        <div {...rest} className={`header-image-container aspect-square lg:aspect-video min-h-[500px] max-h-[100vh] ${className}`}>
            <img
                src={
                slideData.backdrop_path ?
                `${high_resolution_backdrop}${slideData.backdrop_path}` :
                `${high_resolution_poster}${slideData.poster_path}`
                }
                loading='lazy'
                alt={`${slideData.title ?? slideData.name} movie/serie presentation image`}
                className="w-full h-10/12 sm:h-full object-cover object-bottom"
            />
        </div>
    );
});

export default Image;