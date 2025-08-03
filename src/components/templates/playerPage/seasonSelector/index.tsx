import { MutableRefObject, useRef, MouseEvent, useCallback, useEffect } from "react";

// componentes
import { CloseButton } from "@/components/atoms/closeButton";
import { SectionTitle } from "../sectionTitle";

// icones
import { IoPlay } from "react-icons/io5";

// utilitarios
import { getReleaseDate } from "@/utils/tmdbApiData/releaseDate";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
type ComponentProps = {
    seasonsList: tmdbObjProps[];
    getSelectedSeason: (id: string) => void;
    selectedSeason: string;
    isModalActive: boolean;
    setModalState: (isActive: boolean) => void;
};

import '../styles.css';

export default function SelectSeason(props: ComponentProps) {

    const {
        seasonsList,
        getSelectedSeason,
        selectedSeason,
        isModalActive,
        setModalState
    } = props;
    const checkboxInputRef: MutableRefObject<(HTMLInputElement | null)> = useRef(null);
    const getSelectedSeasonRef: MutableRefObject<(HTMLParagraphElement | null)> = useRef(null);

    // controla abertura e fechamento do modal
    const checkboxToggle = useCallback((): void => {
        if (!checkboxInputRef.current) return;

        if (isModalActive) {
            checkboxInputRef.current.checked = true;
        } else {
            checkboxInputRef.current.checked = false;
        };
    }, [isModalActive, checkboxInputRef]);

    useEffect(() => {
        checkboxToggle();
        console.log(seasonsList);
    }, [isModalActive]);

    // Atualiza o texto do botão com a temporada selecionada e tambem o carousel
    const updateSelector = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const el = e.currentTarget;
        if (!getSelectedSeasonRef.current || !el) return;
        Object.assign(getSelectedSeasonRef.current, { innerHTML: el.innerText });
        getSelectedSeason(e.currentTarget.id);
        setModalState(false);
    }, [getSelectedSeasonRef, getSelectedSeason, checkboxToggle]);

    const openModal = useCallback(() => {
        setModalState(true);
    }, [setModalState]);

    const closeModal = useCallback(() => {
        setModalState(false);
    }, [setModalState]);

    return (
        <>
            <button
                onClick={openModal}
                className="border border-secondary/20 h-12 px-5 outline-none text-secondary text-[17px] font-medium w-fit max-w-full flex items-center cursor-pointer rounded-[10px] justify-center flex-nowrap overflow-hidden hover:border-secondary transition-colors duration-300">
                {/* Nome da temporada - Data de lançamento */}
                <span ref={getSelectedSeasonRef} className="line-clamp-1 whitespace-nowrap">
                    {seasonsList[0].name} {" - " + getReleaseDate(seasonsList[0].air_date)}
                </span>
                <IoPlay className="text-sm rotate-90 ml-5" />
            </button>

            {/* Input checkbox que controla a abertura/fechamento do modal de temporadas */}
            <input ref={checkboxInputRef} type="checkbox" id="my_modal_6" className="modal-toggle" />

            {/* Modal com todas as temporadas disponiveis */}
            <div className="modal" style={{ overflowY: 'visible', transition: 'all 0s linear' }} role="dialog">
                {isModalActive &&
                    <div className="relative z-50 rounded-[15px] bg-surface overflow-visible p-7 md:p-10 border-2 border-secondary/5 my-10">
                        <SectionTitle className="mb-8">Selecione uma temporada:</SectionTitle>
                        <div className="seasons-wrapper">
                            {/* Gerando as temporadas apartir da lista retornada pela api do TMDB */}
                            {seasonsList.map((season) => (
                                <button
                                    key={`season-${season.id}`}
                                    onClick={(e) => {updateSelector(e)}}
                                    id={season.season_number}
                                    className={`w-full h-12 flex items-center justify-center cursor-pointer rounded-[10px] line-clamp-1 border outline-none box-border px-5 md:hover:border-primary md:hover:text-secondary md:hover:scale-105 transition-all duration-300 ${Number(selectedSeason) === season.season_number ? 'text-secondary border-primary font-medium' : 'text-secondary/95 border-primary/20 md:text-secondary/80'}`}
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