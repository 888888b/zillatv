'use client';

// hooks
import { useState, useCallback } from 'react';

// componentes
import PlayerModal from '@/components/templates/playerPage/trailerPlayback';
import Image from '@/components/atoms/heroImage';
import PlayButton from '@/components/molecules/playButton';
import AddToList from '../addToListButton';

// icons
import { FaPlay } from "react-icons/fa";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

type HeaderProps = {
    playerData: tmdbObjProps;
};

export default function Header(props: HeaderProps) {
    const playerData = props.playerData;
    const [isPlayerActive, setIsPlayerActive] = useState(false);

    const openPlayer = useCallback((): void => {
        setIsPlayerActive(true);
    }, [setIsPlayerActive]);

    const closePlayer = useCallback((): void => {
        setIsPlayerActive(false);
    }, [setIsPlayerActive]);

    const getTrailerKey = useCallback((): string | undefined => {
        if (!playerData) return;
        const keywords = ['dublado', 'Dublado', 'pt', 'BR', 'en', 'legendado', 'Legendado']
        const videos: tmdbObjProps[] = playerData.videos.results;
        const video = keywords.map(key => (videos.find(video => JSON.stringify(video).includes(key)))).find(video => video !== undefined);
        return video ? video.key : undefined;
    }, [playerData]);

    return (
        <div className='player-header'>
            <div className='w-full pb-10 relative'>
                {/* Imagem do filme/serie */}
                <div className="img-box">
                    <Image slideData={playerData} className='max-h-[335px] sm:max-h-[95vh] sm:min-h-[500px] lg:min-h-[550px]' />
                </div>

                {/* Informações do filme/serie */}
                <div className='w-full px-5 flex flex-col items-center justify-between gap-y-4 sm:items-start sm:px-10 lg:px-16 overflow-hidden sm:absolute sm:left-0 sm:bottom-[calc(45vh-130px)] z-5'>
                    {/* titulo */}
                    <h1 className={`text-[35px] leading-[38px] text-center sm:text-left font-black font-raleway text-secondary line-clamp-3 sm:max-w-[80%] sm:text-5xl sm:leading-[55px] lg:text-6xl lg:max-w-[60%] lg:leading-[70px]`}>
                        {playerData.title ?? playerData.name}
                    </h1>
                    <div className='flex items-center justify-center gap-x-4 flex-nowrap'>
                        {/* Ir para pagina de detalhes */}
                        <PlayButton onClick={openPlayer}>
                            <FaPlay className='text-base'/>
                            Assistir
                        </PlayButton>
                        {/* adicionar filme/serie aos favoritos */}
                        <AddToList/>
                    </div>
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