'use client';

// hooks
import { useEffect, useState, useCallback } from "react";
import useTmdbFetch from "@/hooks/tmdb";

// componentes
import SeasonSelector from "../seasonSelector";
import Carousel from "@/components/templates/playerPage/episodesCarousel";
import { SectionTitle } from "../sectionTitle";

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

    const getSeason = useCallback((index: string) => {
        setSelectedSeason(index);
    }, [setSelectedSeason]);

    const setModalState = useCallback((isActive: boolean) => {
        setIsModalActive(isActive);
    }, [setIsModalActive]);

    return seasonData?.episodes ? (
        <div className={`flex flex-col gap-y-8 ${className}`}>
            {/* Seletor de temporada */}
            <div className="px-5 sm:px-10 lg:px-16">
                <SeasonSelector
                    selectedSeason={selectedSeason}
                    getSelectedSeason={getSeason}
                    seasonsList={seasons}
                    setModalState={setModalState}
                    isModalActive={isModalActive}
                />
                {/* Titulo do carousel */}
                <SectionTitle className="line-clamp-2 mt-5">
                    {seasonData?.name}
                </SectionTitle>
            </div>

            {/* carousel aqui  */}
            <Carousel
                episodes={seasonData.episodes}
                serieName={serieName}
                seasonNumber={selectedSeason}
                isDataLoading={isDataLoading}
            />
        </div>
    ) : null
};