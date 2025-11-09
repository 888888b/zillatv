"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { LangCode, LangLabel } from "@/i18n/languages";

export type Lang = { code: LangCode, label: LangLabel };

export type LanguageContextType = {
    language: Lang;
    setLanguage: (lang: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Lang>({ code: "pt-BR", label: 'Português (Brasil)' });

    const setLanguage = async (lang: Lang) => {
        // atualiza contexto
        setLanguageState(lang);
        // salva idioma como cookie no servidor
        await fetch('/api/set-language', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lang),
        });
        // salva no localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("language", JSON.stringify(lang));

            const currentPath = window.location.pathname;
            const newLang = lang.code.toLowerCase();

            // Remove o prefixo atual do idioma
            const cleanedPath = currentPath.replace(/^\/[a-z]{2}-[a-z]{2}/i, "");

            // Monta nova URL mantendo o restante
            window.location.href = `/${newLang}${cleanedPath || "/home"}`;
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
