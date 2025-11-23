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
            <summary ref={btnRef} className="font-medium text-sm outline-0 border border-secondary rounded-sm  px-1 [list-style:none] flex items-center [font-size:clamp(1rem,1.15vw,1.125rem)] gap-x-1 cursor-pointer">
                {selected}
                <FaPlay className="w-[5px] h-[5px] rotate-90" />
            </summary>
            <ul className="absolute right-0 mt-2 bg-surface border-2 border-secondary/5 rounded-md z-1 w-fit p-2 max-h-[80vh] overflow-y-scroll py-3">
                {languages.map(lang => (
                    <li
                        onClick={() => setNewLang(lang)}
                        key={lang.code}
                        className={`${lang.code === language.code ? 'text-primary font-semibold pointer-events-none' : 'text-secondary'} [font-size:clamp(0.875rem,1vw,1rem)] hover:underline px-4 py-3 cursor-pointer font-medium whitespace-nowrap`}>
                        {lang.label}
                    </li>
                ))}
            </ul>
        </details>
    );
};