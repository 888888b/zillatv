'use client';
import { useRef, MouseEvent, useCallback, useEffect } from "react";
// componentes
import { CloseButton } from "@/components/atoms/closeButton";
import SectionTitle from "../../sectionTitle";
// icones
import { IoPlay } from "react-icons/io5";
// utilitarios
import { getReleaseDate } from "@/utils/tmdbApiData/releaseDate";
// tipos
import { TmdbMediaProps } from "@/app/types";
type ComponentProps = {
    seasonsList: TmdbMediaProps[];
    getSelectedSeason: (id: string) => void;
    selectedSeason: string;
    isModalActive: boolean;
    setIsModalActive: (isActive: boolean) => void;
};

export default function SelectSeason(props: ComponentProps) {
    const {
        seasonsList,
        getSelectedSeason,
        selectedSeason,
        isModalActive,
        setIsModalActive
    } = props;
    const checkboxInputRef = useRef<HTMLInputElement | null>(null);
    const selectedSeasonNameRef = useRef<HTMLSpanElement | null>(null);

    // controla abertura e fechamento do modal
    const checkboxToggle = useCallback((): void => {
        if (!checkboxInputRef.current) return;
        checkboxInputRef.current.checked = isModalActive;
    }, [isModalActive, checkboxInputRef]);

    useEffect(() => {
        checkboxToggle();
    }, [isModalActive]);

    // Atualiza o texto do botão com a temporada selecionada e tambem o carousel
    const updateSelector = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const el = e.currentTarget;
        if (!selectedSeasonNameRef.current || !el) return;
        selectedSeasonNameRef.current.innerText = el.innerText;
        getSelectedSeason(e.currentTarget.id);
        setIsModalActive(false);
    }, [selectedSeasonNameRef, getSelectedSeason, checkboxToggle]);

    const openModal = useCallback(() => {
        setIsModalActive(true);
    }, [setIsModalActive]);

    const closeModal = useCallback(() => {
        setIsModalActive(false);
    }, [setIsModalActive]);

    return (
        <>
            <button
                onClick={openModal}
                className="[font-size:clamp(0.9375rem,1.6vw,1rem)] lg:[font-size:clamp(1rem,1.07vw,1.0625rem)] border border-secondary/20 h-10 lg:h-12 px-[1em] outline-none text-secondary font-semibold w-fit max-w-full flex items-center cursor-pointer rounded-md justify-center flex-nowrap overflow-hidden hover:border-secondary transition-colors duration-300">
                {/* Nome da temporada - Data de lançamento */}
                <span ref={selectedSeasonNameRef} className="line-clamp-1 uppercase whitespace-nowrap">
                    {seasonsList[0].name} {" - " + getReleaseDate(seasonsList[0].air_date)}
                </span>
                <IoPlay className="rotate-90 ml-4" />
            </button>
            {/* Input checkbox que controla a abertura/fechamento do modal de temporadas */}
            <input ref={checkboxInputRef} type="checkbox" id="my_modal_6" className="modal-toggle" />
            {/* Modal com todas as temporadas disponiveis */}
            <div className="modal" style={{ overflowY: 'visible', transition: 'all 0s linear' }} role="dialog">
                {isModalActive &&
                    <div className="relative z-50 rounded-[10px] bg-surface overflow-visible p-7 md:p-10 border-2 border-secondary/5 my-10">
                        <SectionTitle className="mb-8">Selecione uma temporada:</SectionTitle>
                        <div className="seasons-wrapper">
                            {/* Gerando as temporadas apartir da lista retornada pela api do TMDB */}
                            {seasonsList.map((season) => (
                                <button
                                    key={`season-${season.id}`}
                                    onClick={(e) => {updateSelector(e)}}
                                    id={season.season_number}
                                    className={`[font-size:clamp(1rem,1.15vw,1.125rem)] w-full h-12 flex items-center justify-center cursor-pointer rounded-md line-clamp-1 border outline-none box-border px-5 md:hover:border-primary md:hover:text-secondary md:hover:scale-105 transition-all duration-300 ${Number(selectedSeason) === season.season_number ? 'text-secondary border-primary font-medium' : 'text-secondary/95 border-primary/20 md:text-secondary/80'}`}
                                >
                                    <span className="truncate">
                                        {season.name} {season.air_date && ' - '} {getReleaseDate(season.air_date)}
                                    </span>
                                </button>
                            ))}
                        </div>
                        {isModalActive && <CloseButton onClick={closeModal} />}
                    </div>
                }
                {/* Overlay */}
                < div className="w-screen h-lvh fixed top-0 left-0 bg-background/85" />
            </div>
        </ >
    );
};