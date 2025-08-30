'use client';

// hooks
import { useEffect, useRef, useContext } from 'react';

// componentes
import SearchBar from '@/components/molecules/searchBar';
import AuthButtons from './authButtons';
import NavLinksBar from './navLinksBar';
import MobileMenu from './mobileMenu';
import ProfileIcon from './profileIcon';
import Link from 'next/link';

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

        if ( window.scrollY > 10 ) {
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
            <header ref={headerRef} className="fixed top-0 left-0 px-5 z-40 w-full flex items-center justify-between font-bold sm:px-10 lg:px-16 overflow-hidden max-w-[1440px] min-[1440px]:left-1/2 min-[1440px]:-translate-x-1/2">
                <div className="flex items-center gap-x-10">
                    {/* icone do menu mobile */}
                    <label htmlFor='header-drawer' className="flex flex-col justify-center items-center gap-y-[3px] *:w-[20px] *:h-[2px] *:bg-secondary *:rounded-[0.04em] bg-secondary/15 h-10 w-[46px] rounded-md cursor-pointer lg:hidden">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>

                    {/* logo do projeto lado esquerdo */}
                    <Link href={'/'}>
                        <img
                            src='/project_logo.svg'
                            alt='Imagem logo do ZillaTV'
                            loading='lazy'
                            className='h-7 w-fit lg:h-[30px] cursor-pointer'
                        />
                    </Link>
                    
                    {/* barra com links para navegação meio */}
                    <NavLinksBar isUserLoggedIn={isLoggedIn}/>
                </div>

                {/* barra de navegaçao direita */}
                <div className='flex items-center gap-x-6'>
                    {/* barra de pesquisa */}
                    <img
                        src='/search_icon.png'
                        alt='Icone de lupa do ZillaTV'
                        loading='eager'
                        className='h-[26px] w-fit cursor-pointer md:hidden'
                    />
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