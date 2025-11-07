'use client';
// hooks
import { useState, useRef, MouseEvent, useCallback } from 'react';
// icones
import { BsFillPlayFill } from "react-icons/bs";
import { RiGlobalLine } from "react-icons/ri";
// contexto
import useLanguage from '@/hooks/lang';
// linguagens
import { languages } from '@/i18n/languages';
// tipo
import { Lang } from '@/contexts/lang';
// estilos
import './styles.css';

export default function LangSelector() {
    const [isOpened, setIsOpened] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const langsListRef = useRef<HTMLDivElement | null>(null);
    const { language, setLanguage } = useLanguage();

    const toggleSelect = useCallback((): void => {
        setIsOpened(prev => !prev);
        if (langsListRef.current) langsListRef.current.scrollIntoView({behavior: 'smooth'});
    }, [langsListRef]);

    const setNewLang = (lang: Lang) => {
        setLanguage(lang);
        setIsOpened(false);
    };

    return (
        <div className="w-fit lang-selector">
            {/* overlay  */}
            {/* botao do select */}
            <button id='lang-selector' className={`relative outline-0 min-w-[170px] h-[clamp(40px,4.8vw,48px)] rounded-md border-2 px-4 flex items-center font-semibold gap-x-2 justify-between [font-size:clamp(0.875rem,1vw,1rem)] cursor-pointer  duration-100 transition-all ${isOpened ? 'rounded-t-none text-secondary bg-surface border-secondary/5 border-t-transparent z-[101]' : 'border-secondary/30 hover:text-secondary hover:border-secondary'}`} onClick={toggleSelect} ref={btnRef}>
                <RiGlobalLine className="[font-size:clamp(22px,1.5vw,24px)]" />
                {language.label}
                <BsFillPlayFill className="rotate-90" />
            </button>
            {/* opções do select */}
            {(btnRef.current) &&
                <div className={isOpened ? 'opened-selector' : 'closed-selector'}>
                    <div className='overlay fixed top-0 left-0 bg-background/80 w-full h-[100lvh] z-[100]' />
                    <div id='languages' ref={langsListRef} className='languages-list z-[101] absolute -translate-y-[calc(100%+clamp(40px,4.8vw,48px))] bg-surface rounded-t-md before:absolute before:-bottom-0.5 before:h-5 before:w-full before:bg-gradient-to-b before:from-transparent before:to-surface before:z-10 border-2 border-secondary/5' style={{ width: btnRef.current.offsetWidth }}>
                        <ul className="max-h-[70vh] overflow-y-scroll *:hover:underline *:px-4 *:py-3 py-3 *:cursor-pointer font-medium text-sm">
                            {languages.map(lang => (
                                <li
                                    onClick={() => setNewLang(lang)}
                                    key={lang.code}
                                    className={`${lang.code === language.code && 'text-secondary font-semibold'}`}>
                                    {lang.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};