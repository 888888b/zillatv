'use client';
// traduções
import translations from '@/i18n/translations/sections/translations.json';
// componentes
import MoviesSeriesCarousel from "@/components/organisms/moviesSeriesCarousel";
import SectionTitle from "../../sectionTitle";
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { LangCode } from '@/i18n/languages';
type ComponentProps = { 
    data: TmdbMediaProps[];
    className?: string;
    lang: string;
};

export default function SimilarsCarousel({data, className, lang}:ComponentProps) {
    const text = translations[lang as LangCode];

    return data ? (
        <div className={`flex flex-col gap-y-6 page-max-width relative ${className}`}>
            <div id='similar-movies' className="absolute -top-[116px] left-0"/>
            <SectionTitle className="page-padding text-left">
                {text.similar_movies}
            </SectionTitle>
            <MoviesSeriesCarousel 
                slidesData={data} 
                slidesType="movie" 
                lang={lang}
            />
        </div>
    ) : null;
}; 