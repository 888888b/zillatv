'use client';
// hooks
import { useEffect, useRef, useContext, useCallback } from 'react';
// components
import SearchBar from '@/components/molecules/searchBar';
import AuthButtons from './authButtons';
import NavLinksBar from './navLinksBar';
import MobileMenu from './mobileMenu';
import ProfileIcon from './profileIcon';
import Link from 'next/link';
// contexts
import { UserDataContext } from '@/contexts/user';

import './styles.css';

export default function Header() {
    const headerRef = useRef<HTMLElement | null>(null);
    const mobileSearchRef = useRef<HTMLDivElement | null>(null);
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
    const toggleMobileSearch = useCallback((show: boolean) => {
        const bar = mobileSearchRef.current;
        if (bar) bar.classList.toggle('active', show);
    }, []);

    return (
        <MobileMenu>
            <header
                ref={headerRef}
                className="
          fixed top-0 left-0 page-padding z-40 w-full 
          flex items-center justify-between font-bold overflow-hidden 
          max-w-[2000px] min-[2000px]:left-1/2 min-[2000px]:-translate-x-1/2
        "
            >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-x-10">
                    {/* Mobile menu icon */}
                    <label
                        htmlFor="header-drawer"
                        className="
              flex flex-col justify-center items-center gap-y-[3px]
              *:w-[20px] *:h-[2px] *:bg-secondary *:rounded-[0.04em]
              bg-secondary/15 h-10 w-[46px] rounded-md cursor-pointer lg:hidden
            "
                    >
                        <span />
                        <span />
                        <span />
                    </label>

                    {/* Logo */}
                    <Link href="/">
                        <img
                            src="/project_logo.svg"
                            alt="Logo"
                            loading="lazy"
                            className="h-7 w-fit lg:h-[clamp(1.875rem,2vw,2rem)] cursor-pointer hidden lg:block"
                        />
                    </Link>

                    {/* Nav Links */}
                    <NavLinksBar isUserLoggedIn={isLoggedIn} />
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-x-6">
                    {/* mobile search icon */}
                    <img
                        src="/search_icon.png"
                        alt="Search"
                        loading="eager"
                        className="h-[26px] w-fit cursor-pointer lg:hidden"
                        onClick={() => toggleMobileSearch(true)}
                    />

                    {/* mobile search bar */}
                    <div
                        ref={mobileSearchRef}
                        className="
              w-full h-full absolute left-0 top-0 flex items-center 
              justify-center page-padding mobile-search-bar
            "
                    >
                        <SearchBar
                            isAnimated={false}
                            className="lg:hidden w-full h-12"
                            callback={() => toggleMobileSearch(false)}
                        />
                    </div>

                    {/* lg search bars */}
                    <SearchBar isAnimated className="hidden lg:inline 2xl:hidden" />
                    <SearchBar isAnimated={false} className="hidden 2xl:inline w-[20vw]" />

                    {/* Auth or Profile */}
                    {isLoggedIn ? <ProfileIcon /> : <AuthButtons />}
                </div>
            </header>
        </MobileMenu>
    );
}
