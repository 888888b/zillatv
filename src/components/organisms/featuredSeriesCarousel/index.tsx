'use client';
// hooks
import { useContext, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import Logo from '../headerCarousel/logo';
// icones
import { FaBookmark } from "react-icons/fa6";
// contextos
import { UserDataContext } from '@/contexts/user';
import { GlobalContext } from "@/contexts/global";
// utilitarios
import { TmdbMediaProps } from '@/app/[lang]/types';
import { tmdbConfig } from '@/app/[lang]/constants';
import { getLogoPath } from '@/utils/tmdb/getLogoPath';
import './styles.css';
// tipos
type ComponentProps = {
    slidesData: TmdbMediaProps[] | undefined;
    slidesType: 'movie' | 'serie' | 'mixed';
    className?: string;
    lang: string;
};

export default function FeaturedSeriesCarousel(props: ComponentProps) {
    const { push } = useRouter();
    const setEvent = useContext(GlobalContext).dispatch;

    const {
        low_resolution_poster,
        low_resolution_backdrop,
        medium_resolution_logo,
    } = tmdbConfig;

    const {
        slidesType,
        className,
        slidesData,
        lang
    } = props;

    const {
        favoriteMovies,
        favoriteSeries,
        isLoggedIn,
    } = useContext(UserDataContext);

    const carouselData: TmdbMediaProps[] | undefined =
        slidesData?.map(slide => {
            const isFavorite = (favoriteMovies?.includes(slide.id) || favoriteSeries?.includes(slide.id) && isLoggedIn)
            const logo = getLogoPath(slide.images?.logos ?? [], slide.id, lang);
            return {
                ...slide,
                isFavorite: isFavorite,
                logo: logo?.path
            };
        }
    );

    // leva para a pagina do player
    const navigateToPlayer = useCallback((mediaId: string, mediaType: string): void => {
        setEvent({ type: 'IS_LOADING_ACTIVE', payload: true });
        if (slidesType === 'mixed' && mediaType) {
            push(`/${lang.toLowerCase()}/player/${mediaType}/${mediaId}`);
            return;
        };
        push(`/${lang.toLowerCase()}/player/${slidesType}/${mediaId}`);
    }, [slidesType, setEvent, push, lang]);

    return carouselData ? (
        <div className={`featured-series ${className}`}>
            <EmblaCarousel
                navigationType='featured'
                slidesPerView={'auto'}
                align='start'
                breakpoints={{
                    '(min-width: 1px)': { duration: 20, dragFree: true, loop: true },
                    '(min-width: 1024px)': { duration: 25, dragFree: false }
                }}>
                {carouselData.map((media, index) => (
                    (media.poster_path || media.backdrop_path) ? (
                        <div className='embla__slide' key={`default-slide-${media.id}`}>
                            <div className="hover-animation">
                                <span className='[line-height:1] custom-stroke'>{index + 1}</span>
                                <div onClick={() => navigateToPlayer(media.id, media.media_type)} className='img-box'>
                                    {/* icone de favorito */}
                                    {media.isFavorite &&
                                        <div className='bookmark-icon bg-background/60 w-[clamp(28px,3.55vw,36px)] aspect-square rounded-full flex items-center justify-center z-30 absolute top-[clamp(4px,1.2vw,12px)] right-[clamp(4px,1.2vw,12px)] text-primary [font-size:clamp(0.875rem,1.6vw,1rem)]'>
                                            <FaBookmark />
                                        </div>
                                    }
                                    {/* Imagem do filme/serie */}
                                    <img
                                        src={
                                            media.backdrop_path ?
                                                `${low_resolution_backdrop}${media.backdrop_path}` :
                                                `${low_resolution_poster}${media.poster_path}`
                                        }
                                        alt={`Imagem poster de ${media.title ?? media.name}`}
                                        loading='lazy'
                                        className="img"
                                    />
                                    { media.logo &&
                                        <Logo
                                            src={medium_resolution_logo + media.logo}
                                            alt={`Logo da série ${media.title ?? media.name}`}
                                            className='serie-logo'
                                            loading='lazy'
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div>
    ) : null;
};