'use client';
import useLanguage from '@/hooks/lang';
import { FaPlay } from "react-icons/fa";
import { languages } from '@/i18n/languages';
import { useRef } from 'react';
import { Lang } from '@/contexts/lang';

export default function LangSelector() {
    const { language, setLanguage } = useLanguage();
    const selected = language.code.split('-')[0].toUpperCase();
    const btnRef = useRef<HTMLElement | null>(null);

    const closeDropdown = () => {
        if (!btnRef.current) return;
        btnRef.current.click();
    };

    const setNewLang = (lang: Lang) => {
        setLanguage(lang);
        closeDropdown();
    };

    return (
        <details className="dropdown dropdown-end">
            <summary ref={btnRef} className="font-medium lg:font-normal text-sm outline-0 border border-secondary 
            rounded-(--radius-button)  px-1 [list-style:none] flex items-center text-[clamp(1rem,1.15vw,1.125rem)] gap-x-1 cursor-pointer">
                {selected}
                <FaPlay className="w-[5px] h-[5px] rotate-90" />
            </summary>
            <ul className="absolute right-0 mt-2 bg-surface border-2 border-secondary/5 rounded-(--radius-box) 
            z-1 w-fit p-2 max-h-[80vh] overflow-y-scroll py-3">
                {languages.map(lang => (
                    <li
                        onClick={() => setNewLang(lang)}
                        key={lang.code}
                        className={`text-[clamp(0.875rem,1vw,1rem)] hover:underline px-4 py-3 cursor-pointer 
                        font-medium whitespace-nowrap flex items-center flex-nowrap gap-2`}>
                        {/* input do tipo radio */}
                        <div className='w-5 aspect-square rounded-full border-3 border-secondary flex items-center justify-center'>
                            { lang.code === language.code && 
                                <div className='w-2.5 aspect-square rounded-full bg-secondary'/>
                            }
                        </div>
                        {/* opção de idioma */}
                        {lang.label}
                    </li>
                ))}
            </ul>
        </details>
    );
};