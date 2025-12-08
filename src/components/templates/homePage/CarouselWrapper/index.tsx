'use client';
// componentes
import { CarouselTitle } from "@/components/atoms/carouselTitle";
import MovieSerieCarousel from '@/components/organisms/mediaCarousel';
import FeaturedCarousel from '@/components/organisms/featuredSeriesCarousel';
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { Key } from "react";
type ComponentProps = {
    key?: Key | null;
    data: TmdbMediaProps[];
    index: number;
    title: string;
    lang: string;
    carouselType: 'default' | 'featured';
};

export default function CarouselWrapper(props: ComponentProps) {
    const { data, key, index, title, lang, carouselType } = props;

    return (
        <div key={key}>
            {/* linha divisoria */}
            <div className={`flex flex-col gap-y-6 page-max-width overflow-hidden ${index > 1 ? 'py-8' : 'pb-8'}`}>
                {/* Titulo */}
                <CarouselTitle className="justify-between sm:justify-start page-padding">
                    {title}
                </CarouselTitle>
                {/* Carousel */}
                {carouselType === 'default' ?
                    <MovieSerieCarousel
                        slidesData={data}
                        slidesType='mixed'
                        className={title.toLowerCase()}
                        lang={lang}
                    />
                    :
                    <FeaturedCarousel
                        slidesData={data}
                        slidesType='mixed'
                        className={title.toLowerCase()}
                        lang={lang}
                    />
                }
            </div>
        </div>
    );
};