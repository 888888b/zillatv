// componentes
import ContentDetails from "./contentDetails/index";
import ActorsCarousel from "./actorsCarousel/index";
import UsersComments from "./commentsSection/index";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

import { tmdbConfig } from "@/app/constants";

type ComponentProps = {
    contentData: tmdbObjProps;   
    contentType: string;
};

export default function Main( props: ComponentProps ) {

    const contentData = props.contentData;
    const {
        low_resolution_backdrop,
        low_resolution_poster
    } = tmdbConfig;

    return (
        <div className="flex flex-col px-4 md:px-6 lg:px-8">
            { contentData.overview && (
                /* Descrição do filme/serie */
                <p className='text-justify w-full text-[17px] lg:text-lg md:text-left leading-loose text-neutral-300 max-w-4xl'>
                    { contentData.overview }
                </p>
            )}

            {/* seção com mais detalhes */}
            <div className="bg-darkpurple w-full mt-10 p-3 lg:p-4 rounded-md">
                <div>
                    {/* Titulo da seção */}
                    <h2 className="text-2xl font-semibold">
                        Todos os detalhes
                    </h2>
 
                    {/* Container com os detalhes */}
                    <div className="mt-5 relative flex flex-col gap-y-7 items-start">
                        {/* Imagem do filme/serie */}
                        <div className="sm:absolute sm:left-0 h-full">
                            <img
                                src={
                                    contentData.poster_path ? 
                                    low_resolution_poster + contentData.poster_path :
                                    low_resolution_backdrop + contentData.backdrop_path
                                }
                                alt={`${contentData.title ?? contentData.name} movie/serie presentation image`}
                                width={'100%'}
                                height={'100%'}
                                loading='lazy'
                                className='w-40 sm:w-60 h-full object-cover bg-darkpurple image rounded-md'
                            />
                        </div>
                        {/* todos os detalhes do filme/serie */}
                        <ContentDetails contentType={props.contentType} contentData={props.contentData}/>
                    </div>
                </div>
                {/* carousel com o elenco do filme/serie */}
                <ActorsCarousel actorsData={contentData.credits.cast ?? []}/>
            </div>

            {/* seção de comentarios */}
            <UsersComments/>
        </div>
    );
};