// hooks
import { useContext, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// contexto
import { GlobalContext } from '@/contexts/global';
// translations
import translations from '@/i18n/translations/header/translations.json';
// tipo
import { LangCode } from '@/i18n/languages';

import './styles.css';

export default function NavLinksBar(
    {isUserLoggedIn, lang}:{isUserLoggedIn: boolean, lang:string}) {
    const { dispatch } = useContext(GlobalContext);
    const { push } = useRouter();
    const pagePath = usePathname();
    const text = translations[lang as LangCode];
    const lowerCaseLang = lang.toLowerCase();

    // ativa o loading e lida com a navegação
    const navigate = useCallback((path: string) => {
        if (path === pagePath) return;
        dispatch({type: 'IS_LOADING_ACTIVE', payload: true});
        push(`/${lang.toLowerCase()}${path}`);
    }, [push, pagePath, dispatch, lang]);

    return (
        <nav className='hidden lg:block'>
            <ul className='flex gap-x-[25px] items-center'>
                <li onClick={() => navigate(`/home`)}>
                    {text.home}
                </li>

                <li onClick={() => navigate(`/movies`)}>
                    {text.movies}
                </li>

                <li onClick={() => navigate(`/series`)}>
                    {text.series}
                </li>

                {isUserLoggedIn && (
                    <li onClick={() => navigate(`/favorites`)}>
                       {text.favorites}
                    </li>
                )}
            </ul>
        </nav>
    );
};