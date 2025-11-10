import { LangCode } from "@/i18n/languages";

export const formatLangCode = (lang: string | undefined): LangCode => {
    if (!lang) return 'pt-BR';
    return [lang.split('-')[0], lang.split('-')[1].toUpperCase()].join('-') as LangCode;
};