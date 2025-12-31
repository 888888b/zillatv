'use client';
// hooks
import { useState, useCallback, useEffect } from 'react';
// traduções
import translations from '@/i18n/translations/buttons/translations.json';
// componentes
import TrailerModal from '@/components/templates/playerPage/header/trailer';
import LazyImage from '../lazyImage';
import PlayButton from '@/components/molecules/playButton';
import Title from '@/components/organisms/headerCarousel/title';
import AddToListButton from '@/components/molecules/addToListButton';
// icons
import { FaPlay } from "react-icons/fa";
// utilitarios
import { getLogoPath } from '@/utils/tmdb/getLogoPath';
import { tmdbConfig } from '@/app/[lang]/constants';
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
import { LangCode } from '@/i18n/languages';
type HeaderProps = {
    media: TmdbMediaProps;
    type: 'tv' | 'serie' | 'movie';
    lang: string;
};
type MediaImages = {
    lowResolutionImage: string;
    highResolutionImage: string;
    lowResolutionLogo: string;
    highResolutionLogo: string;
};

export default function Header(props: HeaderProps) {
    const { media, lang, type } = props;
    const [isPlayerActive, setIsPlayerActive] = useState(false);
    const [videoID, setVideoID] = useState<string | null>(null);
    const logo = getLogoPath(media.images.logos, media.id, lang);
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
        lowResolutionImage: media.backdrop_path ?
            blur_resolution_backdrop + media.backdrop_path :
            blur_resolution_poster + media.poster_path,
        highResolutionImage: media.backdrop_path ?
            high_resolution_backdrop + media.backdrop_path :
            high_resolution_poster + media.poster_path,
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
        if (!media) return;
        const keywords = ['dublado', 'Dublado', 'pt', 'BR', 'en', 'legendado', 'Legendado']
        const videos: TmdbMediaProps[] = media.videos.results;
        const video = keywords.map(key => (videos.find(video => JSON.stringify(video).includes(key)))).find(video => video !== undefined);
        const key = video ? video.key : null;
        setVideoID(key);
    }, [media]);

    useEffect(() => {
        getTrailerKey();
    }, [media]);

    return (
        <div className='hero w-full'>
            <div className='w-full relative'>
                {/* Imagem do filme/serie */}
                <div className="img-box relative">
                    <LazyImage
                        lowSrc={mediaImages.lowResolutionImage}
                        highSrc={mediaImages.highResolutionImage}
                        alt={`Poster do filme/serie ${media.name ?? media.title}`}
                        className='media-image h-[335px] w-full aspect-video object-cover object-center sm:h-auto 
                        sm:max-h-screen sm:min-h-[400px] transition-opacity duration-300 ease-out' />
                </div>

                {/* Informações do filme/serie */}
                <div className='w-full page-padding page-max-width flex flex-col items-center gap-y-4 z-10 relative mx-auto 
                -mt-10 sm:absolute sm:pointer-events-none sm:mt-0 sm:bottom-[clamp(116px,17.2vw,166px)] left-0 sm:items-start 
                2xl:left-1/2 2xl:-translate-x-1/2'>
                    {/* titulo */}
                    {!logo ?
                        // texto
                        <Title>{media.name ?? media.title}</Title>
                        :
                        // imagem
                        <LazyImage
                            lowSrc={mediaImages.lowResolutionLogo}
                            highSrc={mediaImages.highResolutionLogo}
                            className='media-logo'
                            alt={`Logo do filme/serie ${media.title ?? media.name}`}
                        />
                    }
                    <div className='flex items-center justify-center gap-x-4 flex-nowrap'>
                        {/* abre o modal do trailer */}
                        <PlayButton onClick={openPlayer} className={`${!videoID && 'opacity-70 pointer-events-none'}`}>
                            {text.watch}
                        </PlayButton>
                        {/* adicionar filme/serie aos favoritos */}
                        <AddToListButton
                            mediaId={media.id}
                            mediaType={type}
                        />
                    </div>
                </div>
            </div>

            {videoID &&
                <TrailerModal
                    title={media.name ?? media.title}
                    mediaId={videoID}
                    isPlayerActive={isPlayerActive}
                    closePlayer={closePlayer}
                />
            }
        </div>
    );
};