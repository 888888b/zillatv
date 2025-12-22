// hooks
import { memo, useCallback, useState, useRef } from "react";
// componentes
import { ArrowRight } from "@/components/atoms/arrowRightIcon";
// traduções
import translations from "@/i18n/translations/buttons/translations.json";
// tipos
import { GenreType } from "@/components/templates/moviesPage/mediaSectionWrapper";
import { TmdbMediaProps } from "@/app/[lang]/types";
import { LangCode } from "@/i18n/languages";
type ComponentProps = {
    onSelectGenre: (genre: GenreType) => void;
    selectedGenre: GenreType;
    genres: TmdbMediaProps;
    lang: string
};
// estilos
import './styles.css';

const GenreSelect = memo(({ 
    genres, onSelectGenre, selectedGenre, lang
}: ComponentProps) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [isOpened, setIsOpened] = useState(false);
    const text = translations[lang as LangCode];

    const toggleDropdown = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const { top } = el.getBoundingClientRect();
        setIsOpened(prev => !prev);
        window.scrollTo({
            top: top + window.scrollY - 150,
            behavior: "smooth",
        });
    }, []);

    const handleSelectGenre = useCallback((genre: string[]) => {
        if (selectedGenre.genre === genre[0]) return;
        onSelectGenre({ genre: genre[0], title: genre[1] });
        setIsOpened(false);
    }, [onSelectGenre, selectedGenre]);

    return (
        <div className={`relative selector-wrapper ${isOpened ? 'opened' : 'closed'}`}>
            <h3 className="font-medium mb-1 text-center sm:text-left text-[clamp(1rem,1.15vw,1.125rem)]">
                {text.genre}
            </h3>

            {/* Seletor */}
            <button
                ref={ref}
                onClick={toggleDropdown}
                className={`selector border border-secondary/20 rounded-(--radius-button) flex items-center gap-8 cursor-pointer md:hover:border-secondary transition-all duration-300 text-secondary font-medium w-fit text-[clamp(1.125rem,1.3vw,1.25rem)] h-12 pl-6 pr-2 overflow-hidden mx-auto sm:mx-0`}>
                <span className="min-w-[150px] text-left pointer-events-none">
                    {selectedGenre.title}
                </span>

                {/* Ícone */}
                <div className="relative px-6 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-8 before:bg-secondary/20">
                    <ArrowRight
                        width={24}
                        height={24}
                        stroke="2"
                        className={'arrow-right'}
                    />
                </div>
            </button>
            {/* overlay */}
            <div className='overlay fixed top-0 left-0 bg-background/80 w-full h-lvh z-100' />
            {/* Dropdown */}
            <div
                className={`selector-options absolute left-0 top-[86px] w-full sm:w-fit max-w-3xl md:max-w-[80vw] lg:max-w-[60vw] bg-surface border-2 border-secondary/5 rounded-(--radius-box) px-6 py-8 z-101`}>
                <ul className="grid grid-cols-[auto] justify-items-center sm:grid-cols-[auto_auto_auto] md:grid-cols-[auto_auto_auto_auto] gap-8 sm:gap-y-5 sm:gap-x-10 max-h-[50vh] overflow-y-scroll text-[clamp(1.0625rem,1.2vw,1.1875rem)] *:cursor-pointer *:hover:underline">
                    {Object.entries(genres).map((genre) => (
                        // index 0 === genero / index 1 === titulo a ser exibido
                        <li
                            key={`${genre[0]}-movie-genre`}
                            onClick={() => handleSelectGenre(genre)}
                            className={selectedGenre.genre === genre[0]
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
