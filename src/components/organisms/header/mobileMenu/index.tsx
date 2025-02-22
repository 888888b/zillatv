// hooks
import { useRouter, usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

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
    const handleLinkClick = ( path: string ) => {
        push(path);
        drawerInputRef.current?.click();
    };

    // fechamento direto do menu
    const closeMenu = () => {
        drawerInputRef.current?.click();
    };

    const updateLinkStyle = () => {
        navLinksRef.current.forEach( link => {
            if ( link?.id === pathname ) {
                Object.assign(link.style, { color: '#ffff13' });
            };

            if ( link?.id !== pathname && link ) {
                Object.assign(link.style, { color: 'white' });
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
                <div className="w-80 min-h-full bg-darkpurple px-4 py-6 flex flex-col">
                    {/* conteudo do menu aqui */}
                    <SearchBar 
                        className='w-full h-12 md:hidden' 
                        callback={closeMenu}
                    />
                    {/* links para navegação */}
                    <ul className="font-inter font-bold text-white mt-10 flex flex-col gap-y-5 text-base *:cursor-pointer">
                        <li 
                            ref={(e) => {navLinksRef.current[0] = e}} 
                            onClick={() => handleLinkClick('/')}
                            style={{animationTimingFunction: 'ease'}}
                            className="hover:text-primary duration-300"
                            id="/">
                            Inicio
                        </li>
                        <li className="w-full h-px bg-white/10 rounded-xl"></li>
                        <li 
                            onClick={() => handleLinkClick('/movies')}
                            ref={(e) => {navLinksRef.current[1] = e}}
                            style={{animationTimingFunction: 'ease'}}
                            className="hover:text-primary duration-300"
                            id="/movies">
                            Filmes
                        </li>
                        <li className="w-full h-px bg-white/10 rounded-xl"></li>
                        <li 
                            onClick={() => handleLinkClick('/series')}
                            ref={(e) => {navLinksRef.current[2] = e}}
                            style={{animationTimingFunction: 'ease'}}
                            className="hover:text-primary duration-300"
                            id="/series">
                            Series
                        </li>
                        <li className="w-full h-px bg-white/10 rounded-xl"></li>
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