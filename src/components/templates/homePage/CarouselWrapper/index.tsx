'use client';
// componentes
import { CarouselTitle } from "@/components/atoms/carouselTitle";
import MovieSerieCarousel from '@/components/organisms/mediaCarousel';
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { LangCode } from "@/i18n/languages";
import { Key } from "react";
type ComponentProps = { 
    key?: Key | null;
    data: TmdbMediaProps[];
    index: number;
    title: 'disney' | 'paramount' | 'hbo' | 'netflix' | 'prime' | 'trending';
    lang: string
};
// translations 
import translations from '@/i18n/translations/sections/translations.json';

export default function CarouselWrapper({data, key, index, title, lang} : ComponentProps) {
    const text = translations[lang as LangCode];

    return (
        <div key={key}>
            {/* linha divisoria */}
            {index !== 1 &&
                <div className="w-full h-px my-8 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
            }
            {/* Carousel com desenhos/animes */}
            <div className="flex flex-col gap-y-6 page-max-width">
                {/* Titulo */}
                <CarouselTitle className="justify-between sm:justify-start page-padding">
                    {text[title]}
                </CarouselTitle>
                {/* Carousel */}
                <MovieSerieCarousel
                    slidesData={data}
                    slidesType='mixed'
                    className={title.toLowerCase()}
                    lang={lang}
                />
            </div>
        </div>
    );
};