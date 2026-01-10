'use client';
// hooks
import { useEffect, useRef, useContext, useCallback } from 'react';
// components
import SearchBar from '@/components/organisms/header/searchBar';
import NavLinksBar from './navLinksBar';
import MobileMenu from './mobileMenu';
import AccountDropdown from './accountDropdown';
import Link from 'next/link';
import { SearchIcon } from '@/components/atoms/searchIcon';
import LangSelector from './langSelector';
// contexts
import { UserDataContext } from '@/contexts/user';

import './styles.css';

export default function Header({ lang }: { lang: string }) {
    const headerRef = useRef<HTMLElement | null>(null);
    const searchWrapperRef = useRef<HTMLDivElement | null>(null);
    const { isLoggedIn } = useContext(UserDataContext);

    /** Atualiza o estilo do header ao scrollar */
    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;
        const handleScroll = () => {
            const isScrolling = window.scrollY > 10;
            header.classList.toggle('is-scrolling', isScrolling);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /** Mobile search bar handlers */
    const setIsMobileSearchActive = useCallback((value: boolean) => {
        const wrapper = searchWrapperRef.current;
        if (wrapper) wrapper.classList.toggle('active-bar', value);
    }, []);

    return (
        <MobileMenu lang={lang}>
            <header
                ref={headerRef}
                className="
                fixed top-0 left-0 page-padding z-40 w-full
                flex items-center justify-between font-bold
                max-w-[2000px] min-[2000px]:left-1/2 min-[2000px]:-translate-x-1/2
                ">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-x-5 lg:gap-x-10">
                    {/* Mobile menu icon */}
                    <label
                        htmlFor="header-drawer"
                        className="
                        flex flex-col justify-center items-center gap-y-[3px]
                        *:w-5 *:h-0.5 *:bg-secondary 
                        bg-secondary/15 h-10 w-[46px] rounded-(--radius-button) cursor-pointer lg:hidden
                        ">
                        <span />
                        <span />
                        <span />
                    </label>

                    {/* Logo */}
                    <Link href={`/${lang.toLowerCase()}/home`}>
                        <img
                            src="/logo.png"
                            alt="Logo do Zillatv"
                            loading="lazy"
                            className="w-[clamp(81px,9.2vw,94px)] cursor-pointer"
                        />
                    </Link>

                    {/* Nav Links */}
                    <NavLinksBar isUserLoggedIn={isLoggedIn} lang={lang} />
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-x-5 text-secondary">
                    <div className='search-bar-wrapper relative' ref={searchWrapperRef}>
                        {/* icone de lupa */}
                        {/* Mostra barra de pesquisa ao ser clicado */}
                        <SearchIcon
                            pathClass='stroke-[0.1] lg:stroke-0'
                            onClick={() => setIsMobileSearchActive(true)}
                            className='search-icon cursor-pointer w-[clamp(24px,1.65vw,26px)] 
                            h-[clamp(24px,1.65vw,26px)]'
                        />

                        {/* checkbox para controlar abertura/fechamento da search bar no mobile */}
                        <input type="checkbox" id='search-bar-checkbox' className='absolute top-1/2 -translate-y-1/2 
                        right-0 w-[clamp(24px,1.65vw,26px)] appearance-none h-[clamp(24px,1.65vw,26px)]'/>

                        {/* barra de pesquisa*/}
                        <div
                            className="w-screen fixed left-0 top-0 search-bar z-2 h-[75px] flex items-center justify-center bg-surface
                            lg:-translate-y-1/2 lg:h-fit lg:absolute lg:top-1/2 lg:right-0 lg:left-auto px-(--page-padding) lg:w-fit lg:px-0">
                            <SearchBar
                                callback={() => setIsMobileSearchActive(false)}
                                lang={lang}
                            />
                        </div>
                    </div>

                    <AccountDropdown />
                    {/* exibe lista com opções de idiomas */}
                    <LangSelector/>
                </div>
            </header>
        </MobileMenu>
    );
}
