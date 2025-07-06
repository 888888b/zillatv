import { ComponentPropsWithRef } from "react"
import { tmdbConfig } from "@/app/constants";
import { tmdbObjProps } from "@/contexts/tmdbContext";

type ComponentProps = ComponentPropsWithRef<'div'> & {
    slideData: tmdbObjProps
};

export default function Image( props: ComponentProps ) {
    const { slideData, ...rest } = props;
    // urls para imagens
    const {
        high_resolution_backdrop,
        high_resolution_poster
    } = tmdbConfig;

    return (
        <div {...rest} className='embla__slide relative'>
            {/* container da imagem */}
            <div className="header-image-container aspect-square lg:aspect-video min-h-[500px] max-h-[100vh]">
                <img
                    src={
                        slideData.backdrop_path ?
                            `${high_resolution_backdrop}${slideData.backdrop_path}` :
                            `${high_resolution_poster}${slideData.poster_path}`
                    }
                    alt={`${slideData.title ?? slideData.name} movie/serie presentation image`}
                    className="w-full h-10/12 sm:h-full object-cover object-bottom"
                />
            </div>
        </div>
    )
}