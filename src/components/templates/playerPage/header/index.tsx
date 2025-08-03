'use client';

// hooks
import { useEffect, useState, useCallback } from 'react';

// componentes
import PlayerModal from '@/components/templates/playerPage/trailerPlayback';
import Image from '@/components/atoms/heroImage';
import HeroButton from '@/components/molecules/heroButton';
import { PlayIcon } from '@/components/atoms/playIcon';

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

// utilitarios
import { getLogoPath } from '@/utils/tmdbApiData/getLogoPath';
import { tmdbConfig } from '@/app/constants';

type HeaderProps = {
    playerData: tmdbObjProps;
};

export default function Header(props: HeaderProps) {
    const playerData = props.playerData;
    const { ImageBasePath } = tmdbConfig;
    const [logo, setLogo] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPlayerActive, setIsPlayerActive] = useState(false);

    useEffect(() => {
        if (playerData.images) {
            const img = getLogoPath(playerData.images.logos, playerData.id);
            if (img) {
                setLogo(ImageBasePath + '/w500' + img.path);
                setLoading(false);
            } else {
                setLoading(false);
            };
            return;
        };

        setLoading(false);
    }, [playerData]);

    const openPlayer = useCallback((): void => {
        setIsPlayerActive(true);
    }, []);

    const closePlayer = useCallback((): void => {
        setIsPlayerActive(false);
    },[]);

    const getTrailerKey = useCallback((): string | undefined => {
        if (!playerData) return;
        const keywords = ['dublado', 'Dublado', 'pt', 'BR', 'en', 'legendado', 'Legendado']
        const videos: tmdbObjProps[] = playerData.videos.results;
        const video = keywords.map(key => (videos.find(video => JSON.stringify(video).includes(key)))).find(video => video !== undefined);
        return video ? video.key : undefined;
    }, [playerData]);

    return (
        <div className='header-wrapper'>
            <div className='w-full relative'>
                {/* Imagem do filme/serie */}
                <div className="w-full relative aspect-square lg:aspect-video min-h-[500px] max-h-[95vh] overflow-hidden img-box">
                    <Image slideData={playerData} className='w-full' />
                </div>

                {/* Informações do filme/serie */}
                <div className='absolute left-0 bottom-12 w-full sm:w-fit px-5 flex flex-col items-center justify-between gap-y-4 sm:items-start sm:px-10 sm:bottom-[80px] lg:px-[70px] z-10 pointer-events-none overflow-hidden'>
                    { !loading && (
                        logo ?
                            <img src={logo} alt={`Imagem poster de ${playerData.name ?? playerData.title}`} className='max-h-[12vh] max-w-[75vw] h-full sm:max-h-[20vh] sm:max-w-[50vw] md:max-w-[40vw] md:max-h-[25vh] lg:max-h-[30vh] xl:max-w-[35vw] 2xl:max-h-[40vh] 2xl:max-w-[40vw] w-fit' loading='eager' style={{ filter: 'brightness(120%)' }}/>
                            :
                            <h1 className='text-3xl sm:text-4xl sm:text-start font-black text-secondary text-center line-clamp-1 font-raleway md:text-5xl truncate max-w-8/12 md:leading-14 md:pointer-events-auto sm:max-w-[530px] md:hover:max-w-none md:hover:line-clamp-2 md:hover:whitespace-normal lg:text-6xl lg:leading-20 xl:text-7xl xl:leading-24'>
                                {playerData.title ?? playerData.name}
                            </h1>
                    )}

                    {/* botao que aciona o player */}
                    <HeroButton onClick={openPlayer}>
                        <PlayIcon size={24}/>
                        Assistir trailler
                    </HeroButton>
                </div>
            </div>
            <PlayerModal 
                title={playerData.name ?? playerData.title} 
                mediaId={getTrailerKey()}
                isPlayerActive={isPlayerActive}
                closePlayer={closePlayer}
            />
        </div>
    );
};