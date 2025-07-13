'use client';

// hooks
import { useEffect, useRef, useContext } from 'react';

// componentes
import SearchBar from '@/components/molecules/searchBar';
import AuthButtons from './authButtons';
import NavLinksBar from './navLinksBar';
import MobileMenu from './mobileMenu';
import ProfileIcon from './profileIcon';

// contexto
import { UserDataContext } from '@/contexts/authenticationContext';

import './styles.css';

export default function Header() {

    const headerRef = useRef<null | HTMLElement>( null );
    const {
        isLoggedIn
    } = useContext( UserDataContext );

    const updateHeaderStyles = () => {
        const header = headerRef.current;
        if ( !header ) return;

        if ( window.scrollY > 70 ) {
            header.classList.add('is-scrolling');
            return
        };

        header.classList.remove('is-scrolling');
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
            <header ref={headerRef} className="fixed top-0 left-0 px-5 z-40 w-full flex items-center justify-between font-bold sm:px-10 lg:px-[70px] overflow-hidden">
                <div className="flex items-center gap-x-10">
                    {/* icone do menu mobile */}
                    <label htmlFor='header-drawer' className="flex flex-col justify-center items-center gap-y-[7px] *:w-[30px] *:h-[0.1rem] *:bg-secondary *:rounded-xl bg-secondary/10 h-11 w-[60px] rounded-[10px] cursor-pointer lg:hidden">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>

                    {/* logo do projeto lado esquerdo */}
                    <h1 className={`hidden lg:inline text-[22px] text-primary font-raleway font-black`}>
                        Zillu TV
                    </h1>
                    
                    {/* barra com links para navegação meio */}
                    <NavLinksBar isUserLoggedIn={isLoggedIn}/>
                </div>

                {/* barra de navegaçao direita */}
                <div className='flex items-center gap-x-10'>
                    {/* barra de pesquisa */}
                    <SearchBar animation={true} className='hidden md:inline'/>
                    { !isLoggedIn ?
                        /* botão de login/singup lado direito */
                        <AuthButtons/> :
                        /* dropdown com opções para gerencialmento de conta */
                        <ProfileIcon/>
                    }
                </div>
                
            </header>
        </MobileMenu>
    );
};