// hooks
import { memo, useCallback, useState, useRef } from "react";
import useLanguage from "@/hooks/lang";
// componentes
import { ArrowRight } from "@/components/atoms/arrowRightIcon";
// traduções
import translations from "@/i18n/translations/buttons/translations.json";
// tipos
import { GenreType } from "@/components/templates/moviesPage/moviesSection";
import { TmdbMediaProps } from "@/app/types";
type ComponentProps = {
    onSelectGenre: (genre: GenreType) => void;
    selectedGenre: GenreType;
    genres: TmdbMediaProps;
};

const GenreSelect = memo(({ genres, onSelectGenre, selectedGenre }: ComponentProps) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const lang = useLanguage().language.code;
    const text = translations[lang];

    const toggleDropdown = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const { top } = el.getBoundingClientRect();
        setOpen(prev => !prev);
        window.scrollTo({
            top: top + window.scrollY - 150,
            behavior: "smooth",
        });
    }, []);

    const handleSelectGenre = useCallback((genre: string[]) => {
        if (selectedGenre.genre === genre[0]) return;
        onSelectGenre({genre: genre[0], title: genre[1]});
        setOpen(false);
    },[onSelectGenre, selectedGenre]);

    return (
        <div className="relative">
            <h3 className="font-medium mb-1 text-center sm:text-left [font-size:clamp(1rem,1.15vw,1.125rem)]">
                {text.genre}
            </h3>

            {/* Seletor */}
            <button
                ref={ref}
                id="genre-selector"
                onClick={toggleDropdown}
                className={`border border-secondary/20 rounded-md flex items-center gap-8 cursor-pointer md:hover:border-secondary transition-all duration-300 text-secondary font-medium w-fit [font-size:clamp(1.125rem,1.3vw,1.25rem)] h-12 pl-6 pr-2 overflow-hidden mx-auto sm:mx-0 ${open ? "z-50" : ""
                    }`}
            >
                <span className="min-w-[150px] text-left pointer-events-none">
                    {selectedGenre.title}
                </span>

                {/* Ícone */}
                <div className="relative px-6 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-8 before:bg-secondary/20">
                    <ArrowRight
                        width={24}
                        height={24}
                        stroke="2"
                        className={`${open ? "-rotate-90 text-text" : "rotate-90 text-secondary"}`}
                    />
                </div>
            </button>

            {/* Dropdown */}
            <div
                className={`absolute left-0 top-[86px] w-full sm:w-fit max-w-[768px] md:max-w-[80vw] lg:max-w-[60vw] bg-surface border-2 border-secondary/5 rounded-md px-6 py-5 ${open ? "visible z-40" : "invisible"}`}>
                <ul className="grid grid-cols-[auto] justify-items-center sm:grid-cols-[auto_auto_auto] md:grid-cols-[auto_auto_auto_auto] gap-8 sm:gap-y-5 sm:gap-x-10 max-h-[55vh] overflow-scroll [font-size:clamp(1.0625rem,1.2vw,1.1875rem)] *:cursor-pointer *:hover:underline">
                    {Object.entries(genres).map((genre) => (
                        // index 0 === genero / index 1 === titulo a ser exibido
                        <li
                            key={`${genre[0]}-movie-genre`}
                            onClick={() => handleSelectGenre(genre)}
                            className={ selectedGenre.genre === genre[0]
                                    ? "text-primary font-semibold pointer-events-none" : ""}>
                            {genre[1]}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});

GenreSelect.displayName = "GenreSelect";
export default GenreSelect;
