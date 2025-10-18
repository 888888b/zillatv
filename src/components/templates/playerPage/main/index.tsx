'use client';
// hooks
import { CSSProperties, useCallback, useState } from 'react';
// componentes
import ContentDetails from "./mediaDetails/index";
import ActorsCarousel from "./actorsCarousel/index";
import LazyImage from '../lazyImage';
import Description from './description';
import WhereToWatch from "./whereToWatch";
// import UsersComments from "../commentsSection/index";
import SectionTitle from '../sectionTitle';
// tipos
import { StreamingsInfo } from '@/hooks/watchmode';
import { tmdbObjProps } from "@/contexts/tmdbContext";
type ComponentProps = { 
    mediaData: tmdbObjProps; 
    mediaType: 'serie' | 'movie' | 'tv';
    streamingsData: StreamingsInfo[] | undefined;
};
type MediaImage = { lowResolutionImage: string, highResolutionImage: string };
// utilitarios
import { tmdbConfig } from "@/app/constants";

export default function Main(props: ComponentProps) {
    const { mediaData, mediaType, streamingsData } = props
    const [mediaImgHeight, setMediaImgHeight] = useState(0);
    const {
        high_resolution_backdrop,
        high_resolution_poster,
        blur_resolution_backdrop,
        blur_resolution_poster
    } = tmdbConfig;
    const mediaImage: MediaImage = {
        lowResolutionImage: mediaData.backdrop_path ?
            blur_resolution_backdrop + mediaData.backdrop_path :
            blur_resolution_poster + mediaData.poster_path,
        highResolutionImage: mediaData.backdrop_path ?
            high_resolution_backdrop + mediaData.backdrop_path :
            high_resolution_poster + mediaData.poster_path
    };

    const getMediaImgHeight = useCallback((height: number) => {
        setMediaImgHeight(height);
    }, [setMediaImgHeight]);

    return (
        <main className="flex flex-col gap-y-8 relative mt-8 sm:-mt-[clamp(84px,13vw,134px)] page-max-width lg:gap-y-16">
            {mediaData.overview && (
                /* Descrição do filme/serie */
                <Description overview={mediaData.overview} />
            )}
            {/* GRID - WIDTH >= 1024PX */}
            <div className="flex flex-col gap-y-8 custom-grid lg:px-[var(--page-padding)] lg:gap-x-[var(--page-padding)] lg:grid lg:[grid-template-columns:1fr_clamp(300px,30vw,450px)]">
                {/* GRID - LADO ESQUERDO */}
                <div className="lg:flex lg:flex-col lg:gap-y-16 overflow-hidden w-full">
                    {/* Exibe opções de streamings para assistir o filme/serie */}
                    <WhereToWatch data={streamingsData}/>
                    {/* carousel de atores em telas grandes  */}
                    {mediaData.credits.cast.some((actor: undefined | tmdbObjProps) =>
                        actor && actor.profile_path) &&
                        <div className='flex-col gap-y-6 hidden lg:flex '>
                            <SectionTitle className='text-center sm:text-left'>
                                Elenco
                            </SectionTitle>
                            {/* carousel com o elenco do filme/serie */}
                            <ActorsCarousel actorsData={mediaData.credits.cast} />
                        </div>
                    }
                </div>
                {/* GRID - LADO DIREITO */}
                {/* seção com mais detalhes */}
                <section className="pt-8 flex w-full flex-col bg-surface lg:bg-transparent lg:pt-0">
                    <div className='px-[var(--page-padding)] lg:px-0 page-max-width w-full lg:relative lg:w-full'>
                        {/* Titulo da seção */}
                        <SectionTitle className='text-center sm:text-left lg:max-w-[130px]'>
                            Todos os detalhes
                        </SectionTitle>
                        {/* Container com os detalhes */}
                        <div className="my-8 relative flex justify-end w-full max-w-[1024px] lg:static lg:justify-start">
                            {/* Imagem do filme/serie */}
                            <LazyImage
                                lowSrc={mediaImage.lowResolutionImage}
                                highSrc={mediaImage.highResolutionImage}
                                alt={`Poster do filme/serie ${mediaData.title ?? mediaData.name}`}
                                loading='lazy'
                                style={{"--media-img-height": `${mediaImgHeight}px`} as CSSProperties}
                                className={`w-[35%] rounded-md object-cover absolute top-0 left-0 h-full lg:w-[clamp(140px,14.5vw,220px)] lg:left-auto lg:right-0 lg:h-[var(--media-img-height)]`}
                            />
                            {/* todos os detalhes do filme/serie */}
                            <ContentDetails 
                                mediaType={mediaType} 
                                mediaData={mediaData} 
                                updateMediaImgHeight={getMediaImgHeight}
                            />
                        </div>
                    </div>
                    {/* carousel de atores em dispositivos moveis */}
                    {mediaData.credits.cast.some((actor: undefined | tmdbObjProps) =>
                        actor && actor.profile_path) &&
                        <div className='mt-10 flex flex-col gap-y-6 page-max-width lg:hidden'>
                            <SectionTitle className='text-center sm:text-left page-padding'>
                                Elenco
                            </SectionTitle>
                            {/* carousel com o elenco do filme/serie */}
                            <ActorsCarousel actorsData={mediaData.credits.cast} />
                        </div>
                    }
                </section>
            </div>
        </main>
    );
};