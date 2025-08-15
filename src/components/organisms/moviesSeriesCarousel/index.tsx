'use client';

// hooks
import { useContext, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import useFirebase from "@/hooks/firebase";

// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import FavoriteButton from '@/components/molecules/favoriteButton';

// icones
import { FaPlay } from "react-icons/fa";

// contextos
import { UserDataContext } from '@/contexts/authenticationContext';
import { GlobalEventsContext } from "@/contexts/globalEventsContext";

// funções utilitarias
import { tmdbObjProps } from '@/contexts/tmdbContext';

import { tmdbConfig } from '@/app/constants';

import './styles.css';

type ComponentProps = {
    slidesData: tmdbObjProps[] | undefined;
    slidesType: 'movie' | 'serie' | 'mixed';
};

type Slides = {
    toScroll: number[];
    inView: number[];
};

export default function MoviesSeriesCarousel(props: ComponentProps) {

    const { push } = useRouter();
    const [slidesToScroll, setSlidesToScroll] = useState<number[]>([]);
    const { dispatch } = useContext(GlobalEventsContext);
    const {
        low_resolution_poster,
        low_resolution_backdrop
    } = tmdbConfig;

    const { slidesType } = props;
    const {
        addUserFavoritesToDb,
        deleteUserFavoritesOnDb
    } = useFirebase();

    const {
        favoriteMovies,
        favoriteSeries,
        isLoggedIn
    } = useContext(UserDataContext);

    // Define se o filme/serie e favorito ou nao, caso seja, salva no banco de dados
    const updateUserFavorites = useCallback(async (slideId: string, slideType: string | undefined): Promise<void> => {
        // abre o modal de registro caso o usuario nao esteja logado para completar a ação
        if (!isLoggedIn) {
            dispatch({ type: 'IS_REGISTER_MODAL_ACTIVE', payload: true });
            dispatch({
                type: 'SET_ERROR', payload: {
                    type: 'formInstructions',
                    message: 'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
                }
            });
            return;
        };

        // verifica se o conteudo ja esta dentre os favoritos
        const isAlreadyFavorite = favoriteSeries?.includes(slideId) || favoriteMovies?.includes(slideId);
        const type = slidesType === 'mixed' ? slideType : slidesType;
        if (!type) return;

        if (!isAlreadyFavorite) {
            addUserFavoritesToDb(slideId, type);
        } else {
            deleteUserFavoritesOnDb(slideId, type);
        };

    }, [slidesType, dispatch, favoriteMovies, favoriteSeries, isLoggedIn]);

    // verifica se o conteudo esta nos favorites e retorna true ou false
    const findFavoriteOnList = useCallback((id: string): boolean => {
        const isFavorite =
            favoriteMovies?.includes(id) ||
                favoriteSeries?.includes(id) ? true : false;
        return isFavorite;
    }, [favoriteMovies, favoriteSeries]);

    // lida com a navegaçao
    const navigate = useCallback((slideId: string, slideType: string | undefined): void => {
        dispatch({ type: 'IS_LOADING_ACTIVE', payload: true });
        if (slidesType === 'mixed' && slideType) {
            push(`/player/${slideType}/${slideId}`);
            return;
        };
        push(`/player/${slidesType}/${slideId}`, { scroll: true });
    }, [slidesType]);

    // obtem os slides ativos na viewport | lista com total de slides
    const getActiveSlides = useCallback((indexList: number[], numberOfSlides: number): void => {
        if (!indexList || !numberOfSlides) return;
        const firstSlide = indexList[0];
        const lastSlide = indexList.at(-1) as number;
        const minLength = indexList.length < (indexList[0] + 1) ? indexList.length : indexList[0];
        const maxLength = indexList.length <= (numberOfSlides - (lastSlide + 1)) ? indexList.length : numberOfSlides - (lastSlide + 1);
        const prevSlides: number[] = firstSlide > 0 ? Array.from({ length: minLength }, (_, i) => i + (indexList[0] - minLength)) : [];
        const nextSlides: number[] = lastSlide < (numberOfSlides - 1) ? Array.from({ length: maxLength }, (_, i) => i + lastSlide + 1) : [];
        const inView = [...prevSlides, ...indexList, ...nextSlides];
        setSlidesToScroll([...inView]);
    }, [setSlidesToScroll]);

    return props.slidesData ? (
        <div className='movie-serie-carousel'>
            <EmblaCarousel
                navigationType='default'
                dragFree={false}
                activeSlides={getActiveSlides}
                breakpoints={{
                    '(min-width: 1px)': { slidesToScroll: 3, duration: 20 },
                    '(min-width: 768px)': { slidesToScroll: 4, duration: 25 },
                    '(min-width: 1024px)': { slidesToScroll: 5 },
                }}>
                {/* Gerando slides a partir de um array de objetos retornados pela api do TMDB */}
                {props.slidesData.map((slide, index) => (
                    slide.poster_path || slide.backdrop_path ? (
                        <div className={`embla__slide ${slidesToScroll.includes(index) ? 'active-slide' : 'disable-slide'}`} key={`main-slides-${slide.id}`}>
                            <>
                                <div className='img-wrapper'>
                                    {/* Opção para adicionar o filme/serie aos favoritos */}
                                    <FavoriteButton
                                        updateFavorites={updateUserFavorites}
                                        buttonId={slide.id}
                                        isFavorite={findFavoriteOnList(slide.id)}
                                    />

                                    {/* botao de play */}
                                    <div
                                        className='play-icon-box'
                                        onClick={() => navigate(slide.id, slide.media_type)} >
                                        <FaPlay className="text-background text-lg translate-x-px" />
                                    </div>

                                    {/* Imagem do conteudo a ser exibido */}
                                    <div className='img-box'>
                                        <img
                                            onClick={() => navigate(slide.id, slide.media_type)}
                                            src={
                                                slide.poster_path ?
                                                    `${low_resolution_poster}${slide.poster_path}` :
                                                    `${low_resolution_backdrop}${slide.backdrop_path}`
                                            }
                                            alt={`
                                                ${slide.title ?? slide.name} ${slidesType} presentation image`
                                            }
                                            loading='lazy'
                                            className="img"
                                        />
                                    </div>
                                </div>

                                {/* Container de informações sobre o conteudo */}
                                <div className="mt-[10px] relative pr-2 max-w-[140px] md:max-w-[200px] xl:max-w-56 lg:hidden">
                                    {/* Titulo */}
                                    <h3
                                        className="font-medium text-sm text-secondary/90 line-clamp-1">
                                        {slide.title ?? slide.name}
                                    </h3>
                                </div>
                            </>
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div>
    ) : null;
};