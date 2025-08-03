'use client';

// hooks
import { useState, useRef, useEffect, useCallback } from 'react';

// componentes
import ContentDetails from "../mediaDetails/index";
import ActorsCarousel from "../actorsCarousel/index";
import UsersComments from "../commentsSection/index";
import { SectionTitle } from '../sectionTitle';

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

type ComponentProps = {
    mediaData: tmdbObjProps;
    mediaType: string;
};

import { tmdbConfig } from "@/app/constants";

export default function Main(props: ComponentProps) {

    const { mediaData, mediaType } = props
    const descriptionRef = useRef<HTMLParagraphElement | null>(null);
    const textChangeButton = useRef<HTMLButtonElement | null>(null);
    const {
        high_resolution_backdrop,
        high_resolution_poster
    } = tmdbConfig;
    const [isTextCut, setIsTextCut] = useState<boolean>(false);

    // define se o texto precisa ou nao de um botao VER MAIS / VER MENOS
    useEffect(() => {
        const text = descriptionRef.current;
        if (!text) return;
        const textLineHeight = parseFloat(getComputedStyle(text).lineHeight);
        const lines = text.scrollHeight / textLineHeight;
        setIsTextCut(lines > 6);
    }, [descriptionRef, textChangeButton]);

    // controla a apariçao completa ou parcial do texto a depender do tamanho
    const showEntireText = useCallback(() => {
        const text = descriptionRef.current;
        const button = textChangeButton.current;
        if (!text || !button) return;
        if (text.classList.contains('line-clamp-6')) {
            text.classList.remove('line-clamp-6');
            button.innerHTML = 'Ver menos';
        } else {
            text.classList.add('line-clamp-6');
            button.innerHTML = 'Ver mais';
        };
    }, [descriptionRef, textChangeButton]);

    return (
        <main className="flex flex-col relative px-5 mt-0.5 sm:-translate-y-10 sm:px-10 lg:px-[70px]">
            {mediaData.overview && (
                /* Descrição do filme/serie */
                <>
                    <div className="flex flex-col w-full md:max-w-3xl gap-y-[10px]">
                        <p ref={descriptionRef} className='w-full text-[17px] line-clamp-6 lg:text-lg lg:leading-[30px] leading-7 text-text relative'>
                            {mediaData.overview}
                        </p>
                        {isTextCut &&
                            <button
                                className="border-2 border-secondary/10 outline-none text-secondary text-sm font-semibold uppercase h-10 flex items-center justify-center rounded-xs cursor-pointer"
                                onClick={showEntireText}
                                ref={textChangeButton}>
                                ver mais
                            </button>
                        }
                    </div>
                </>
            )}

            {/* seção com mais detalhes */}
            <div className="mt-[60px] w-full flex flex-col gap-y-[30px]">
                <div>
                    {/* Titulo da seção */}
                    <SectionTitle className='text-center sm:text-left'>Todos os detalhes</SectionTitle>

                    {/* Container com os detalhes */}
                    <div className="my-[30px] relative flex justify-end w-full max-w-[1024px] lg:gap-[30px]">
                        {/* Imagem do filme/serie */}
                        <img
                            src={
                                mediaData.poster_path ?
                                    high_resolution_poster + mediaData.poster_path :
                                    high_resolution_backdrop + mediaData.backdrop_path
                            }
                            alt={`Imagen poster de ${mediaData.title ?? mediaData.name}`}
                            loading='lazy'
                            className='w-1/3 md:w-1/4 lg:object-bottom rounded-lg object-cover absolute top-0 left-0 h-full'
                        />
                        {/* todos os detalhes do filme/serie */}
                        <ContentDetails mediaType={mediaType} mediaData={mediaData} />
                    </div>
                </div>

                { mediaData.credits.cast.some((actor: undefined | tmdbObjProps) => 
                    actor && actor.profile_path) &&
                    <div className='flex flex-col gap-y-[30px]'>
                       <SectionTitle className='text-center sm:text-left'>Elenco</SectionTitle>
                        {/* carousel com o elenco do filme/serie */}
                        <ActorsCarousel actorsData={mediaData.credits.cast} />
                    </div>
                }
            </div>

            {/* seção de comentarios */}
            {/* <UsersComments /> */}
        </main>
    );
};