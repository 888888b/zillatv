// hooks
import { useRouter, usePathname } from "next/navigation";
import { useRef, useEffect, useCallback } from "react";

// tipos
import { ReactNode } from "react";

// componentes
import SearchBar from "@/components/molecules/searchBar";

export default function MobileMenu({ children }:{ children: ReactNode }) {

    const drawerInputRef = useRef<null | HTMLInputElement>( null );
    const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);
    const { push } = useRouter();
    const pathname = usePathname();

    // lida com a navegação e fechamento do menu
    const handleLinkClick = useCallback(( path: string ) => {
        push(path);
        drawerInputRef.current?.click();
    }, [ drawerInputRef, push ]);

    // fechamento direto do menu
    const closeMenu = useCallback(() => {
        drawerInputRef.current?.click();
    }, [ drawerInputRef ]);

    const updateLinkStyle = () => {
        navLinksRef.current.forEach( link => {
            if ( link?.id === pathname ) {
                Object.assign(link.style, { color: 'var(--color-primary)' });
            };

            if ( link?.id !== pathname && link ) {
                Object.assign(link.style, { color: 'var(--color-text)' });
            };
        });
    };

    useEffect(() => {
        updateLinkStyle();
    }, [ pathname ]);

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
                            ref={(e) => {navLinksRef.current[0] = e}} 
                            onClick={() => handleLinkClick('/')}
                            style={{animationTimingFunction: 'ease'}}
                            className="hover:text-primary duration-300"
                            id="/">
                            Início
                        </li>
                        <li className="w-full h-px bg-secondary/5 rounded-xl"></li>
                        <li 
                            onClick={() => handleLinkClick('/movies')}
                            ref={(e) => {navLinksRef.current[1] = e}}
                            style={{animationTimingFunction: 'ease'}}
                            className="hover:text-primary duration-300"
                            id="/movies">
                            Filmes
                        </li>
                        <li className="w-full h-px bg-secondary/5 rounded-xl"></li>
                        <li 
                            onClick={() => handleLinkClick('/series')}
                            ref={(e) => {navLinksRef.current[2] = e}}
                            style={{animationTimingFunction: 'ease'}}
                            className="hover:text-primary duration-300"
                            id="/series">
                            Séries
                        </li>
                        <li className="w-full h-px bg-secondary/5 rounded-xl"></li>
                        <li 
                            onClick={() => handleLinkClick('/favorites')}
                            ref={(e) => {navLinksRef.current[3] = e}}
                            style={{animationTimingFunction: 'ease'}}
                            className="hover:text-primary duration-300"
                            id='/favorites'>
                            Favoritos
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};