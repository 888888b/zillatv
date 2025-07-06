'use client';

// hooks
import { useEffect, useState } from "react";
import useTmdbFetch from "@/components/hooks/tmdb";

// componentes
import SelectSeason from "./seasonSelector";
import EpisodesCarousel from "@/components/organisms/episodesCarousel";
import { CarouselTitle } from "@/components/atoms/carouselTitle";

// funções utilitarias
import { handlePromise } from "@/components/utils/tmdbApiData/promise";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

type ComponentProps = {
    seasons: tmdbObjProps[];
    serieId: string;
    serieName: string;
};

export default function SerieSeansons( props: ComponentProps ) {

    const { fetchSeasons } = useTmdbFetch();
    const [ seasonData, setSeasonData ] = useState<tmdbObjProps>();
    const [ selectedSeasonNumber, setSelectedSeasonNumber ] = useState<string>('1')

    useEffect(() => {
        ( async () => {
            const season = await handlePromise(fetchSeasons( props.serieId, selectedSeasonNumber ));
            setSeasonData( season );
        })();
    }, [ selectedSeasonNumber ]);

    return seasonData?.episodes ? (
        <div className='px-4 w-full pt-8 pb-6 md:px-6 lg:px-8'>   
            {/* Seletor de temporada */}
            <SelectSeason selectedSeason={setSelectedSeasonNumber} seasonsList={props.seasons}/>

            {/* Titulo do carousel */}
            <CarouselTitle>
                {props.serieName} - {seasonData?.name}
            </CarouselTitle>

            {/* carousel aqui  */}
            <EpisodesCarousel
                episodes={seasonData.episodes} 
                serieId={props.serieId} 
                serieName={props.serieName}
                seasonNumber={selectedSeasonNumber}
            />
        </div>
    ) : null
};