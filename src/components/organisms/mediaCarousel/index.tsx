'use client';
// hooks
import { useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useFirebase from '@/hooks/firebase';
// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
// icones
import { FaBookmark } from 'react-icons/fa6';
// contextos
import { UserDataContext } from '@/contexts/user';
import { GlobalContext } from '@/contexts/global';
import { ModalsContext } from '@/contexts/modal';
import { AuthContext } from '@/contexts/auth';

// utilitarios
import { tmdbConfig, platformsDomains, Platform } from '@/app/[lang]/constants';
import { openRegisterModal } from '@/utils/context/openRegisterModal';
import { showSuccessMsg } from '@/utils/toastfy/showSuccessMsg';
// estilos
import "./styles.css";
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
type ComponentProps = {
    slidesData: TmdbMediaProps[] | undefined;
    slidesType: 'movie' | 'serie' | 'mixed';
    className?: string;
    lang: string;
};

export default function MoviesSeriesCarousel(
    { slidesData, slidesType, className = '', lang }
        : ComponentProps) {
    const { push } = useRouter();
    const token = process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY;
    const setEvent = useContext(GlobalContext).dispatch;
    const setModal = useContext(ModalsContext).dispatch;
    const setError = useContext(AuthContext).dispatch;
    const { low_resolution_poster, low_resolution_backdrop } = tmdbConfig;
    const { addUserFavoritesToDb, deleteUserFavoritesOnDb } = useFirebase();
    const { favoriteMovies, favoriteSeries, isLoggedIn, setUserData } = useContext(UserDataContext);

    const carouselData: TmdbMediaProps[] | undefined = slidesData?.map((slide) => ({
        ...slide,
        isFavorite: (favoriteMovies?.includes(slide.id) || favoriteSeries?.includes(slide.id)) && isLoggedIn,
    }));

    const addToFavorites = useCallback(
        async (mediaId: string, mediaType: string) => {
            const msg = mediaType === 'movie' ? 'Filme adicionado ✅' : 'Série adicionada ✅';
            await addUserFavoritesToDb(mediaId, mediaType, setUserData);
            showSuccessMsg(msg);
        },
        [addUserFavoritesToDb]
    );

    const removeFromFavorites = useCallback(
        async (mediaId: string, mediaType: string) => {
            const msg = mediaType === 'movie' ? 'Filme removido ✅' : 'Série removida ✅';
            await deleteUserFavoritesOnDb(mediaId, mediaType);
            showSuccessMsg(msg);
        },
        [deleteUserFavoritesOnDb]
    );

    const updateFavorites = useCallback(
        async (mediaId: string, mediaType: string, isOnDb: boolean) => {
            if (!isLoggedIn) {
                openRegisterModal(
                    setModal,
                    setError,
                    'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
                );
                return;
            }
            isOnDb ? removeFromFavorites(mediaId, mediaType) : addToFavorites(mediaId, mediaType);
        },
        [isLoggedIn, addToFavorites, removeFromFavorites]
    );

    const navigateToPlayer = useCallback(
        (mediaId: string, mediaType: string) => {
            setEvent({ type: 'IS_LOADING_ACTIVE', payload: true });
            if (slidesType === 'mixed' && mediaType) {
                push(`/${lang.toLowerCase()}/player/${mediaType}/${mediaId}`);
                return;
            }
            push(`/${lang.toLowerCase()}/player/${slidesType}/${mediaId}`);
        },
        [slidesType, setEvent, push, lang]
    );

    if (!carouselData) return null;

    return (
        <div className={`w-full media-carousel ${className}`}>
            {/* Componente do carousel */}
            <EmblaCarousel
                navigationType="default"
                slidesPerView="auto"
                breakpoints={{
                    '(min-width: 1px)': { duration: 20, dragFree: true, loop: true },
                    '(min-width: 1024px)': { duration: 25, dragFree: false },
                }}
                className="relative pl-(--page-padding) lg:pl-0 min-[2000px]:w-[round(calc(var(--page-max-width)-var(--page-padding)*2),1px)] min-[2000px]:m-auto min-[2000px]:overflow-x-clip min-[2000px]:px-(--media-carousel-gap) min-[2000px]:box-border"
                containerClass="gap-2"
            >
                {carouselData.map((media) =>
                    media.poster_path || media.backdrop_path ? (
                        // Slide
                        <div
                            key={`slide-${media.id}`}
                            className="embla__slide group opacity-0 invisible transition-opacity duration-300
                            w-[round(calc((100%-16px)/3),1px)] md:w-[round(calc((100%-24px)/4),1px)] lg:w-[round(calc((100%-32px-var(--page-padding)*2)/5),1px)] xl:w-[round(calc((100%-40px-var(--page-padding)*2)/6),1px)] 2xl:w-[round(calc((100%-48px-var(--page-padding)*2)/7),1px)] min-[2000px]:w-[round(calc((100%-48px)/7),1px)]">
                            {/* Wrapper pra animação de hover */}
                            <div className='[transition:transform_0.15s_ease-out] group-hover:transform-[scale(1.06)] will-change-transform origin-center'>
                                {/* Wrapper pra imagem do slide, icone de favoritos e logo de streaming */}
                                <div
                                    className="relative aspect-[1/1.4] overflow-hidden rounded-(--radius-button) bg-surface"
                                    onClick={() => navigateToPlayer(media.id, media.media_type)}>
                                    {/* Icone de favoritos */}
                                    {media.isFavorite && (
                                        <div
                                            className="bookmark-icon absolute top-1.5 right-1.5 z-30 flex items-center justify-center rounded-full
                                            bg-background/60 w-[clamp(28px,3.55vw,36px)] h-[clamp(28px,3.55vw,36px)] text-primary text-[clamp(0.875rem,1.6vw,1rem)]
                                            [transition:opacity_0.15s_ease-out] lg:group-hover:opacity-0 lg:group-hover:pointer-events-none">
                                            <FaBookmark />
                                        </div>
                                    )}
                                    {/* Imagem do filme/serie */}
                                    <img
                                        src={
                                            media.poster_path
                                                ? `${low_resolution_poster}${media.poster_path}`
                                                : `${low_resolution_backdrop}${media.backdrop_path}`
                                        }
                                        alt={`Imagem poster de ${media.title ?? media.name}`}
                                        loading="lazy"
                                        className="w-full h-full cursor-pointer transition-opacity duration-200"
                                    />
                                    {/* Logo de streaming */}
                                    { media.streaming &&
                                        <div className='w-2/5 aspect-square absolute bottom-0 right-0 z-30 bg-background pl-2 pt-2'>
                                            <img
                                                src={`https://img.logo.dev/${platformsDomains[media.streaming as Platform]}?token=${token}&format=webp`}
                                                alt={`Logo da ${media.streaming}`}
                                                className="w-full"
                                            />
                                        </div>
                                    }
                                </div>
                                {/* Info mobile */}
                                <div className="mt-2 pr-2 max-w-[140px] md:max-w-[200px] xl:max-w-56 lg:hidden">
                                    <h3 className="line-clamp-2 font-medium text-sm">
                                        {media.title ?? media.name}
                                    </h3>
                                </div>
                                {/* <DetailsCard
                                    updateFavorites={updateFavorites}
                                    navigate={navigateToPlayer}
                                    media={media}
                                    lang={lang}
                                /> */}
                            </div>
                        </div>
                    ) : null
                )}
            </EmblaCarousel>
        </div>
    );
}
