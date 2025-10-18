'use client';
// hooks
import { useEffect, useState, useCallback } from "react";
import useTmdbFetch from "@/hooks/tmdb";
// componentes
import SeasonSelector from "../seasonSelector";
import Carousel from "@/components/templates/playerPage/footer/episodesCarousel";
import SectionTitle from "../../sectionTitle";
// funções utilitarias
import { handlePromise } from "@/utils/tmdbApiData/promise";
// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
type ComponentProps = {
    seasons: tmdbObjProps[];
    serieId: string;
    serieName: string;
    className?: string;
};

export default function EpisodesCarousel(props: ComponentProps) {
    const { seasons, serieId, serieName, className } = props;
    const { fetchSeasons } = useTmdbFetch();
    const [seasonData, setSeasonData] = useState<tmdbObjProps>();
    const [selectedSeason, setSelectedSeason] = useState<string>('1')
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

    // busca os dados da temporada selecionada assim que o componente carrega
    useEffect(() => {
        (async () => {
            const season = await handlePromise(fetchSeasons(serieId, selectedSeason));
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
                <SectionTitle className="text-left">Episódios</SectionTitle>
                {/* Seletor de temporada */}
                <SeasonSelector 
                    selectedSeason={selectedSeason}
                    getSelectedSeason={setSeason}
                    seasonsList={seasons}
                    setIsModalActive={setModalState}
                    isModalActive={isModalActive}
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