"use client";
import { createContext, useEffect, useState, ReactNode } from "react";

export type Lang = { code: string, label: string };

export type LanguageContextType = {
    language: Lang;
    setLanguage: (lang: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Lang>({ code: "pt-BR", label: 'Português (Brasil)' });

    const setLanguage = (lang: Lang) => {
        setLanguageState(lang);
        if (typeof window !== "undefined") {
            localStorage.setItem("language", JSON.stringify(lang));
        };
    };

    useEffect(() => {
        try {
            const savedLang = localStorage.getItem("language");
            if (!savedLang) return;
            const langObj = JSON.parse(savedLang);
            setLanguageState(langObj);
        } catch (err) {
            console.log(err);
        };
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
