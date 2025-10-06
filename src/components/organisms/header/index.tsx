'use client';

// hooks
import { useEffect, useRef, useContext, useState, useCallback } from 'react';

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

    const headerRef = useRef<null | HTMLElement>(null);
    const mobileSearchBar = useRef<HTMLDivElement | null>(null);
    const [isSearchBarActive, setIsSearchBarActive] = useState<boolean>(false);
    const {
        isLoggedIn
    } = useContext(UserDataContext);

    // utiliza a classe .is-scrolling para alterar altura e cor de fundo do header ao scrollar a pagina
    const updateHeaderStyles = (): void => {
        const header = headerRef.current;
        if (!header) return;

        if (window.scrollY > 10) {
            header.classList.add('is-scrolling');
            return
        };

        header.classList.remove('is-scrolling');
    };

    useEffect(() => {
        if (!window) return;
        updateHeaderStyles();
        window.addEventListener('scroll', updateHeaderStyles);
        return () => {
            window.removeEventListener('scroll', updateHeaderStyles);
        };
    }, []);

    const hideMobileSearchBar = useCallback((): void => {
        const bar = mobileSearchBar.current;
        if (!bar) return;
        bar.classList.remove('active');
    }, []);

    const showMobileSearchBar = useCallback((): void => {
        const bar = mobileSearchBar.current;
        if (!bar) return;
        bar.classList.add('active');
    }, []);

    return (
        <MobileMenu>
            <header ref={headerRef} className="fixed top-0 left-0 page-padding z-40 w-full flex items-center justify-between font-bold overflow-hidden max-w-[2000px] min-[2000px]:left-1/2 min-[2000px]:-translate-x-1/2">
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
                            className='h-7 w-fit lg:h-[clamp(1.875rem,2vw,2rem)] cursor-pointer'
                        />
                    </Link>

                    {/* barra com links para navegação meio */}
                    <NavLinksBar isUserLoggedIn={isLoggedIn} />
                </div>

                {/* barra de navegaçao direita */}
                <div className='flex items-center gap-x-6'>
                    {/* icone de pesquisa */}
                    <img
                        onClick={showMobileSearchBar}
                        src='/search_icon.png'
                        alt='Icone de lupa do ZillaTV'
                        loading='eager'
                        className='h-[26px] w-fit cursor-pointer md:hidden'
                    />
                    {/* barra de pesquisa mobile */}
                    <div ref={mobileSearchBar} className='w-full h-full absolute left-0 top-0 flex items-center justify-center px-5 sm:px-10 mobile-search-bar'>
                        <SearchBar 
                            isAnimated={false} 
                            className='md:hidden w-full h-12' 
                            callback={hideMobileSearchBar}/>
                    </div>
                    {/* componente da barra de pesquisa */}
                    <SearchBar isAnimated={true} className='hidden md:inline 2xl:hidden' />
                    {/* barra de pesquisa em grandes telas */}
                    <SearchBar isAnimated={false} className='hidden 2xl:inline w-[20vw]' />
                    {!isLoggedIn ?
                        /* botão de login/singup lado direito */
                        <AuthButtons /> :
                        /* dropdown com opções para gerencialmento de conta */
                        <ProfileIcon />
                    }
                </div>
            </header>
        </MobileMenu>
    );
};