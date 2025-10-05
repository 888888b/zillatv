import { ComponentPropsWithRef, memo } from "react"
import { tmdbConfig } from "@/app/constants";
import { tmdbObjProps } from "@/contexts/tmdbContext";

type ComponentProps = ComponentPropsWithRef<'img'> & {
    slideData: tmdbObjProps
};

const Image = memo((props: ComponentProps) => {
    const { slideData, className, ...rest } = props;
    // urls para imagens
    const {
        medium_resolution_backdrop,
        medium_resolution_poster
    } = tmdbConfig;

    return (
        <img
            {...rest}
            src={
                slideData.backdrop_path ?
                    `${medium_resolution_backdrop}${slideData.backdrop_path}` :
                    `${medium_resolution_poster}${slideData.poster_path}`
            }
            loading='lazy'
            alt={`Imagem poster de ${slideData.title ?? slideData.name}`}
            className={`w-full aspect-video object-cover object-center ${className}`}
        />
    );
});

Image.displayName = 'HeaderCarouselImage';
export default Image;