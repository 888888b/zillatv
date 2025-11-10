'use client';
// hooks
import { useState, useCallback, useEffect } from 'react';
// traduções
import translations from '@/i18n/translations/buttons/translations.json';
// componentes
import TrailerModal from '@/components/templates/playerPage/header/trailerModal';
import LazyImage from '../lazyImage';
import PlayButton from '@/components/atoms/playButton';
import Title from '@/components/organisms/heroCarousel/title';
import AddToListButton from '@/components/molecules/addToListButton';
// icons
import { FaPlay } from "react-icons/fa";
// utilitarios
import { getLogoPath } from '@/utils/tmdbApiData/getLogoPath';
import { tmdbConfig } from '@/app/[lang]/constants';
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
import { LangCode } from '@/i18n/languages';
type HeaderProps = { 
    playerData: TmdbMediaProps, 
    lang: string 
};
type MediaImages = {
    lowResolutionImage: string;
    highResolutionImage: string;
    lowResolutionLogo: string;
    highResolutionLogo: string;
};

export default function Header(props: HeaderProps) {
    const { playerData, lang } = props;
    const [isPlayerActive, setIsPlayerActive] = useState(false);
    const [videoID, setVideoID] = useState<string | null>(null);
    const logo = getLogoPath(playerData.images.logos, playerData.id, lang);
    const text = translations[lang as LangCode];
    const { 
        blur_resolution_backdrop, 
        blur_resolution_poster,
        high_resolution_backdrop, 
        high_resolution_poster,
        low_resolution_logo,
        high_resolution_logo
    } = tmdbConfig;
    const mediaImages: MediaImages = {
        lowResolutionImage: playerData.backdrop_path ?
            blur_resolution_backdrop + playerData.backdrop_path :
            blur_resolution_poster + playerData.poster_path,
        highResolutionImage: playerData.backdrop_path ?
            high_resolution_backdrop + playerData.backdrop_path :
            high_resolution_poster + playerData.poster_path,
        lowResolutionLogo: logo ? low_resolution_logo + logo.path : '',
        highResolutionLogo: logo ? high_resolution_logo + logo.path : '',
    };

    const openPlayer = useCallback((): void => {
        setIsPlayerActive(true);
    }, [setIsPlayerActive]);

    const closePlayer = useCallback((): void => {
        setIsPlayerActive(false);
    }, [setIsPlayerActive]);

    // busca os ids de trailer do filme/serie, da prioridade a trailers em portugues ou legendados
    const getTrailerKey = useCallback((): void => {
        if (!playerData) return;
        const keywords = ['dublado', 'Dublado', 'pt', 'BR', 'en', 'legendado', 'Legendado']
        const videos: TmdbMediaProps[] = playerData.videos.results;
        const video = keywords.map(key => (videos.find(video => JSON.stringify(video).includes(key)))).find(video => video !== undefined);
        const key = video ? video.key : null;
        setVideoID(key);
    }, [playerData]);

    useEffect(() => {
        getTrailerKey();
    }, [playerData]);

    return (
        <div className='hero w-full'>
            <div className='w-full relative'>
                {/* Imagem do filme/serie */}
                <div className="img-box relative">
                    <LazyImage
                        lowSrc={mediaImages.lowResolutionImage}
                        highSrc={mediaImages.highResolutionImage}
                        alt={`Poster do filme/serie ${playerData.name ?? playerData.title}`}
                        className='media-image h-[335px] w-full aspect-video object-cover object-center sm:h-auto sm:max-h-[100vh] sm:min-h-[400px] transition-opacity duration-300 ease-out' />
                </div>

                {/* Informações do filme/serie */}
                <div className='w-full page-padding page-max-width flex flex-col items-center gap-y-4 z-10 relative mx-auto -mt-10 sm:absolute sm:pointer-events-none sm:-mt-0 sm:bottom-[clamp(116px,17.2vw,166px)] left-0 sm:items-start 2xl:left-1/2 2xl:-translate-x-1/2'>
                    {/* titulo */}
                    { !logo ? 
                        // texto
                        <Title>{playerData.name ?? playerData.title}</Title>
                        :
                        // imagem
                        <LazyImage
                            lowSrc={mediaImages.lowResolutionLogo}
                            highSrc={mediaImages.highResolutionLogo}
                            className='media-logo'
                            alt={`Logo do filme/serie ${playerData.title ?? playerData.name}`}
                        />
                    }
                    <div className='flex items-center justify-center gap-x-4 flex-nowrap'>
                        {/* abre o modal do trailer */}
                        <PlayButton onClick={openPlayer} className={`${!videoID && 'opacity-70 pointer-events-none'}`}>
                            <FaPlay/>
                            {text.watch}
                        </PlayButton>
                        {/* adicionar filme/serie aos favoritos */}
                        <AddToListButton className='opacity-70 pointer-events-none'/>
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