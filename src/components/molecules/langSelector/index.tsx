'use client';
// hooks
import { useState, useRef } from 'react';
// icones
import { BsFillPlayFill } from "react-icons/bs";
import { RiGlobalLine } from "react-icons/ri";
// contexto
import useLanguage from '@/hooks/lang';
// linguagens
import languages from '@/i18n/languages.json';
// tipo
import { Lang } from '@/contexts/lang';

export default function LangSelector() {
    const [isOpened, setIsOpened] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const toggleSelect = (): void => setIsOpened(prev => !prev);
    const { language, setLanguage } = useLanguage();

    const setNewLang = (lang: Lang) => {
        setLanguage(lang);
        setIsOpened(false);
    };

    return (
        <div className="relativ w-fit">
            {/* botao do select */}
            <button className={`outline-0 h-[clamp(40px,4.8vw,48px)] rounded-md border-2 px-4 flex items-center font-semibold gap-x-2 [font-size:clamp(0.875rem,1vw,1rem)] cursor-pointer  duration-300 transition-colors ${isOpened ? 'rounded-t-none text-secondary bg-surface border-secondary/5 border-t-0' : 'border-secondary/30 hover:text-secondary hover:border-secondary'}`} onClick={toggleSelect} ref={btnRef}>
                <RiGlobalLine className="[font-size:clamp(22px,1.5vw,24px)]" />
                {language.label}
                <BsFillPlayFill className="rotate-90" />
            </button>
            {/* opções do select */}
            {(isOpened && btnRef.current) &&
                <div className='absolute left-[var(--page-padding)] -translate-y-[calc(100%+clamp(40px,4.8vw,48px))] bg-surface rounded-t-md before:absolute before:-bottom-0.5 before:h-5 before:w-full before:bg-gradient-to-b before:from-transparent before:to-surface before:z-10 border-2 border-secondary/5' style={{ width: btnRef.current.offsetWidth }}>
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
            }
        </div>
    );
};