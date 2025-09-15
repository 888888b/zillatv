'use client';

// hooks
import { useState, useCallback, useEffect } from 'react';

// componentes
import TrailerModal from '@/components/templates/playerPage/trailerModal';
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
    const [videoID, setVideoID] = useState<string | null>(null);

    const openPlayer = useCallback((): void => {
        setIsPlayerActive(true);
    }, [setIsPlayerActive]);

    const closePlayer = useCallback((): void => {
        setIsPlayerActive(false);
    }, [setIsPlayerActive]);

    const getTrailerKey = useCallback((): void => {
        if (!playerData) return;
        const keywords = ['dublado', 'Dublado', 'pt', 'BR', 'en', 'legendado', 'Legendado']
        const videos: tmdbObjProps[] = playerData.videos.results;
        const video = keywords.map(key => (videos.find(video => JSON.stringify(video).includes(key)))).find(video => video !== undefined);
        const key = video ? video.key : null;
        setVideoID(key);
    }, [playerData]);

    useEffect(() => {
        getTrailerKey();
    }, []);

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
                    <h1 className={`[font-size:clamp(2.18rem,7vw,3rem)] font-black font-raleway text-secondary line-clamp-3 sm:max-w-[80%] lg:[font-size:clamp(3rem,5vw,5rem)] lg:max-w-[60%]`}>
                        {playerData.title ?? playerData.name}
                    </h1>
                    <div className='flex items-center justify-center gap-x-4 flex-nowrap'>
                        {/* Ir para pagina de detalhes */}
                        <PlayButton onClick={openPlayer} className={`${!videoID && 'opacity-70 pointer-events-none'}`}>
                            <FaPlay className='text-base' />
                            Assistir
                        </PlayButton>
                        {/* adicionar filme/serie aos favoritos */}
                        <AddToList />
                    </div>
                </div>
            </div>

            {videoID &&
                <TrailerModal
                    title={playerData.name ?? playerData.title}
                    mediaId={videoID}
                    isPlayerActive={isPlayerActive}
                    closePlayer={closePlayer}
                />
            }
        </div>
    );
};