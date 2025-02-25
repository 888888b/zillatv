'use client';

// hooks
import { useEffect, useRef, useContext } from 'react';

// componentes
import SearchBar from '@/components/molecules/searchBar';
import AuthButtons from './authButtons';
import NavLinksBar from './navLinksBar';
import MobileMenu from './mobileMenu';
import AccountDropdown from './accountDropdown';

// contextos
import { UserDataContext } from '@/components/contexts/authenticationContext';

export default function Header() {

    const headerRef = useRef<null | HTMLElement>( null );
    const {
        isLoggedIn
    } = useContext( UserDataContext );

    const updateHeaderStyles = () => {
        if ( window.scrollY > 70 && headerRef.current ) {
            const styles = { 
                backgroundColor: '#16142B'
            };
            Object.assign(headerRef.current.style, styles);
            return
        };

        const styles = { 
            backgroundColor: 'transparent',
        };
        if ( headerRef.current ) Object.assign(headerRef.current.style, styles);
    };

    useEffect(() => {
        if ( window !== undefined ) {
            updateHeaderStyles();
            window.addEventListener('scroll', updateHeaderStyles);
        };

        return () => {
            window.removeEventListener('scroll', updateHeaderStyles);
        };
    }, []);

    return (
        <MobileMenu>
            <header ref={headerRef} className="fixed top-0 left-0 px-4 py-6 z-40 w-full flex items-center font-inter justify-between font-bold md:px-8 xl:px-10 overflow-hidden">
                <div className="flex items-center">
                    {/* icone do menu mobile */}
                    <label htmlFor='header-drawer' className="flex flex-col justify-center items-center gap-y-[7px] *:w-7 *:h-[0.1rem] *:bg-white *:rounded-xl bg-accent/10 h-11 md:h-[46px] w-16 rounded-[10px] cursor-pointer lg:hidden">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    {/* logo do projeto lado esquerdo */}
                    <h1 className="text-[22px] text-primary font-raleway font-extrabold ml-3 md:text-2xl lg:ml-0">
                        Zillu TV
                    </h1>
                    {/* barra com links para navegação meio */}
                    <NavLinksBar isUserLoggedIn={isLoggedIn}/>
                    {/* barra com input de pesquisa meio */}
                    <SearchBar className='hidden md:block w-[30vw] h-[46px] ml-10'/>
                </div>
                { !isLoggedIn ? 
                    /* botão de login/singup lado direito */
                    <AuthButtons/> : 
                    /* dropdown com opções para gerencialmento de conta */
                    <AccountDropdown/> 
                }
                
            </header>
        </MobileMenu>
    );
};