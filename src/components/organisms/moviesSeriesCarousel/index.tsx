'use client';
// hooks
import { useContext, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import useFirebase from "@/hooks/firebase";
// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import { toast } from 'react-toastify';
import DetailsCard from '@/components/molecules/mediaDetailsCard';
// icones
import { FaBookmark } from "react-icons/fa6";
// contextos
import { UserDataContext } from '@/contexts/authenticationContext';
import { GlobalEventsContext } from "@/contexts/globalEventsContext";
// utilitarios
import { tmdbObjProps } from '@/contexts/tmdbContext';
import { tmdbConfig } from '@/app/constants';
import { openRegisterModal } from '@/utils/context/openRegisterModal';
import { showSuccessMsg } from '@/utils/toastfy/showSuccessMsg';

import './styles.css';
// tipos
type ComponentProps = {
    slidesData: tmdbObjProps[] | undefined;
    slidesType: 'movie' | 'serie' | 'mixed';
    className?: string;
};

export default function MoviesSeriesCarousel(props: ComponentProps) {
    const { push } = useRouter();
    const { dispatch } = useContext(GlobalEventsContext);
    const {
        low_resolution_poster,
        low_resolution_backdrop
    } = tmdbConfig;
    const {
        slidesType,
        className,
        slidesData
    } = props;
    const {
        addUserFavoritesToDb,
        deleteUserFavoritesOnDb
    } = useFirebase();
    const {
        favoriteMovies,
        favoriteSeries,
        isLoggedIn,
        setUserData
    } = useContext(UserDataContext);
    const carouselData = useMemo(() => {
        const data: tmdbObjProps[] | undefined = slidesData?.map(slide => {
            return {
                ...slide,
                isFavorite: (favoriteMovies?.includes(slide.id) || favoriteSeries?.includes(slide.id) && isLoggedIn)
            };
        });
        return data;
    }, [slidesData, favoriteSeries, favoriteMovies, isLoggedIn]);

    // Define se o filme/serie e favorito ou nao, caso seja, salva no banco de dados
    const updateFavorites = useCallback(
        async (mediaId: string, mediaType: string, isOnDb: boolean)
            : Promise<void> => {
            // abre o modal de registro caso o usuario nao esteja logado para completar a ação
            if (!isLoggedIn) {
                openRegisterModal(
                    dispatch,
                    'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
                );
                return;
            };
            const addingMsg = mediaType === 'movie' ? 'Filme adicionado ✅' : 'Série adicionada ✅';
            const removingMsg = mediaType === 'movie' ? 'Filme removido ✅' : 'Série removida ✅';
            if (isOnDb) {
                await deleteUserFavoritesOnDb(mediaId, mediaType);
                showSuccessMsg(removingMsg);
            } else {
                await addUserFavoritesToDb(mediaId, mediaType, setUserData);
                showSuccessMsg(addingMsg);
            };
        }, [dispatch, isLoggedIn, deleteUserFavoritesOnDb, addUserFavoritesToDb]);

    // lida com a navegaçao
    const navigate = useCallback((mediaId: string, mediaType: string): void => {
        dispatch({ type: 'IS_LOADING_ACTIVE', payload: true });
        if (slidesType === 'mixed' && mediaType) {
            push(`/player/${mediaType}/${mediaId}`);
            return;
        };
        push(`/player/${slidesType}/${mediaId}`);
    }, [slidesType, dispatch, push]);

    return carouselData ? (
        <div className={`movie-serie-carousel ${className}`}>
            <EmblaCarousel
                navigationType='default'
                slidesPerView={'auto'}
                breakpoints={{
                    '(min-width: 1px)': { duration: 20, dragFree: true, loop: true },
                    '(min-width: 1024px)': { duration: 25, dragFree: false }
                }}>
                {/* Gerando slides a partir de um array de objetos retornados pela api do TMDB */}
                {carouselData.map((media) => (
                    (media.poster_path || media.backdrop_path) ? (
                        <div className='embla__slide' key={`default-slide-${media.id}`}>
                            <div onClick={() => navigate(media.id, media.media_type)} className='img-box'>
                                {/* icone de favorito */}
                                {media.isFavorite &&
                                    <div className='bookmark-icon bg-background/60 w-[clamp(28px,3.55vw,36px)] aspect-square rounded-full flex items-center justify-center z-30 absolute top-[clamp(4px,1.2vw,12px)] right-[clamp(4px,1.2vw,12px)] text-primary [font-size:clamp(0.875rem,1.6vw,1rem)]'>
                                        <FaBookmark /> 
                                    </div>
                                }
                                {/* Imagem do filme/serie */}
                                <img
                                    src={
                                        media.poster_path ?
                                            `${low_resolution_poster}${media.poster_path}` :
                                            `${low_resolution_backdrop}${media.backdrop_path}`
                                    }
                                    alt={`Imagem poster de ${media.title ?? media.name}`}
                                    loading='lazy'
                                    className="img"
                                />
                            </div>
                            {/* informações do filme/serie em telas pequenas */}
                            <div className="mt-[10px] relative pr-2 max-w-[140px] md:max-w-[200px] xl:max-w-56 lg:hidden font-medium text-sm">
                                {/* Titulo */}
                                <h3 className="line-clamp-1">
                                    {media.title ?? media.name}
                                </h3>
                            </div>
                            {/* informações do filme/serie em telas grandes */}
                            <DetailsCard
                                updateFavorites={updateFavorites}
                                navigate={navigate}
                                media={media}
                            />
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div>
    ) : null;
};