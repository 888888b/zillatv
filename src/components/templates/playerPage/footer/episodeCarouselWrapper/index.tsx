'use client';
// hooks
import { useEffect, useState, useCallback } from "react";
import useTmdbFetch from "@/hooks/tmdb";
// traduções
import translations from '@/i18n/translations/sections/translations.json';
// componentes
import SeasonSelector from "../seasonSelector";
import Carousel from "@/components/templates/playerPage/footer/episodeCarousel";
import SectionTitle from "../../sectionTitle";
// funções utilitarias
import { handlePromise } from "@/utils/tmdb/handlePromise";
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { LangCode } from "@/i18n/languages";
type ComponentProps = {
    seasons: TmdbMediaProps[];
    serieId: string;
    serieName: string;
    className?: string;
    lang: string;
};

export default function EpisodesCarousel({
    seasons, serieId, serieName, className, lang
}: ComponentProps) {
    const { fetchSeasons } = useTmdbFetch();
    const [seasonData, setSeasonData] = useState<TmdbMediaProps>();
    const [selectedSeason, setSelectedSeason] = useState<string>('1')
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
    const text = translations[lang as LangCode];

    // busca os dados da temporada selecionada assim que o componente carrega
    useEffect(() => {
        (async () => {
            const season = await handlePromise(fetchSeasons(serieId, selectedSeason, lang));
            setSeasonData(season);
            setIsDataLoading(state => !state);
        })();
    }, [selectedSeason]);

    const setSeason = useCallback((index: string) => {
        setSelectedSeason(index);
    }, [setSelectedSeason]);

    const setModalState = useCallback((isActive: boolean) => {
        setIsModalActive(isActive);
    }, [setIsModalActive]);

    return seasonData?.episodes ? (
        <div className={`flex flex-col gap-y-6 page-max-width relative ${className}`}>
            <div id='episodes-carousel' className="absolute -top-[116px] left-0" />
            <div className="page-padding flex items-center justify-between gap-x-6 gap-y-2 flex-wrap">
                <SectionTitle className="text-left">{text.episodes}</SectionTitle>
                {/* Seletor de temporada */}
                <SeasonSelector 
                    selectedSeason={selectedSeason}
                    getSelectedSeason={setSeason}
                    seasonsList={seasons}
                    setIsModalActive={setModalState}
                    isModalActive={isModalActive}
                    lang={lang}
                />
            </div>

            {/* carousel de episodeos  */}
            <Carousel
                episodes={seasonData.episodes}
                serieName={serieName}
                seasonNumber={selectedSeason}
                isDataLoading={isDataLoading}
            />
        </div>
    ) : null
};