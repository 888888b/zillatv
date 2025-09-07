// hooks
import { memo, useCallback, useState, useRef } from 'react';
// tipos
import { GenreType } from '@/components/templates/moviesPage/moviesSection';
// componentes
import { ArrowRight } from '@/components/atoms/arrowRightIcon';
import { tmdbObjProps } from '@/contexts/tmdbContext';

type ComponentProps = {
    onSelectGenre: (genre: GenreType) => void;
    selectedGenre: GenreType;
    genres: tmdbObjProps;
};

const GenreSelect = memo((props: ComponentProps) => {
    const { genres, onSelectGenre, selectedGenre } = props;
    const ref = useRef<HTMLButtonElement | null>(null);
    const [isGenreSelectorActive, setIsGenreSelectorActive] = useState<boolean>(false);

    const selectorToggle = useCallback(() => {
        const el = ref.current;
        if (!el || !window) return;
        const elCoordinates = el.getBoundingClientRect();
        setIsGenreSelectorActive(state => !state);
        window.scrollTo({
            top: elCoordinates.top + window.scrollY - 150,
            behavior: 'smooth'
        })
    }, [setIsGenreSelectorActive]);

    const selectGenre = useCallback((genre: GenreType) => {
        if (genre.genre === selectedGenre.genre) return;
        onSelectGenre(genre);
        setIsGenreSelectorActive(false);
    }, [onSelectGenre, setIsGenreSelectorActive, selectedGenre]);

    return (
        // seletor
        <div className={'relative'}>
            <h3 className='font-medium text-text text-base mb-1 leading-6 text-center sm:text-left'>Gênero</h3>
            {/*wrapper do botao de seletor */}
            <div id='genre-selector' className={`border border-secondary/20 rounded-md w-fit flex items-center justify-start gap-8 flex-nowrap cursor-pointer md:hover:border-secondary transition-colors duration-300 text-secondary font-medium text-lg overflow-hidden mx-auto sm:mx-0 ${isGenreSelectorActive ? 'z-999 relative' : 'z-0 static'}`}  onClick={selectorToggle}>
                {/* botao do seletor */}
                <button ref={ref} id={genres.cartoon.genre} className='h-12 pl-6 min-w-[150px] text-left border-none outline-none pointer-events-none'>
                {selectedGenre.title}
                </button>
                {/* icone de seta */}
                <div className='relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-8 before:bg-secondary/20 px-6'>
                    <ArrowRight width={24} height={24} stroke='2' className={`${isGenreSelectorActive ? '-rotate-90 text-text' : 'rotate-90 text-secondary'}`}/>
                </div>
            </div>

            {/* container com generos para selecionar */}
            <div className={`w-full sm:w-fit max-w-[768px] md:max-w-[80vw] lg:max-w-[60vw] absolute top-[86px] left-0 z-40 px-6 py-5 bg-surface rounded-[10px] ${isGenreSelectorActive ? 'visible' : 'invisible'} border-2 border-secondary/5`}>
                <ul className='grid grid-cols-[auto] justify-items-center sm:grid-cols-[auto_auto_auto] md:grid-cols-[auto_auto_auto_auto] sm:justify-items-start sm:overflow-hidden gap-8 sm:gap-y-5 sm:gap-x-10 text-[17px] max-h-[50vh] overflow-scroll *:cursor-pointer *:hover:underline *:whitespace-nowrap'>
                    {Object.values(genres).map((genre) => (
                        <li  
                            onClick={() => selectGenre(genre)}                            
                            key={`${genre.genre}-movie-genre`}
                            className={`${selectedGenre.genre === genre.genre ? 'text-primary font-semibold pointer-events-none' : 'font-mediu'}`}>
                            {genre.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});

GenreSelect.displayName = 'GenreSelect';
export default GenreSelect;