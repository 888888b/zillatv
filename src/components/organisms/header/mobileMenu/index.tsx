// hooks
import { useRouter, usePathname } from "next/navigation";
import { useRef, useEffect, useCallback, useContext } from "react";
// contexto
import { GlobalContext } from "@/contexts/global";
// translations
import translations from '@/i18n/translations/header/translations.json';
// tipos
import { ReactNode } from "react";
import { LangCode } from "@/i18n/languages";

export default function MobileMenu({children, lang}:{children: ReactNode, lang:string}) {
    const drawerInputRef = useRef<null | HTMLInputElement>(null);
    const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);
    const { push } = useRouter();
    const pathname = usePathname();
    const { dispatch } = useContext(GlobalContext);
    const pagePath = usePathname();
    const text = translations[lang as LangCode];

    // ativa o loading e lida com a navegação
    const navigate = useCallback((path: string) => {
        if (path === pagePath) return;
        dispatch({ type: 'IS_LOADING_ACTIVE', payload: true });
        push(path);
        drawerInputRef.current?.click();
    }, [push, pagePath, dispatch]);

    const updateLinkStyle = () => {
        navLinksRef.current.forEach(link => {
            if (link?.id === pathname) {
                Object.assign(link.style, { color: 'var(--color-primary)' });
            };

            if (link?.id !== pathname && link) {
                Object.assign(link.style, { color: 'var(--color-text)' });
            };
        });
    };

    useEffect(() => {
        updateLinkStyle();
    }, [pathname]);

    return (
        <div className="drawer">
            <input ref={drawerInputRef} id="header-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* conteudo do header aqui */}
                {children}
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="header-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="w-80 min-h-full bg-surface px-5 py-6 md:px-10 flex flex-col">
                    {/* conteudo do menu aqui */}
                    {/* links para navegação */}
                    <ul className="font-semibold text-text mt-12 flex flex-col gap-y-6 text-base *:cursor-pointer">
                        <li
                            ref={(e) => { navLinksRef.current[0] = e }}
                            onClick={() => navigate('/')}
                            style={{ animationTimingFunction: 'ease' }}
                            className="hover:text-primary duration-300"
                            id="/">
                            {text.home}
                        </li>
                        <li className="w-full h-px bg-secondary/5 rounded-xl"></li>
                        <li
                            onClick={() => navigate('/movies')}
                            ref={(e) => { navLinksRef.current[1] = e }}
                            style={{ animationTimingFunction: 'ease' }}
                            className="hover:text-primary duration-300"
                            id="/movies">
                            {text.movies}
                        </li>
                        <li className="w-full h-px bg-secondary/5 rounded-xl"></li>
                        <li
                            onClick={() => navigate('/series')}
                            ref={(e) => { navLinksRef.current[2] = e }}
                            style={{ animationTimingFunction: 'ease' }}
                            className="hover:text-primary duration-300"
                            id="/series">
                            {text.series}
                        </li>
                        <li className="w-full h-px bg-secondary/5 rounded-xl"></li>
                        <li
                            onClick={() => navigate('/favorites')}
                            ref={(e) => { navLinksRef.current[3] = e }}
                            style={{ animationTimingFunction: 'ease' }}
                            className="hover:text-primary duration-300"
                            id='/favorites'>
                            {text.favorites}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};