'use client';

// hooks
import { useRef, MutableRefObject, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// icones
import { LuSearch } from "react-icons/lu";

// componentes
import Link from "next/link";
import MobileMenu from "./mobileMenu";
import AccountDropdown from "./dropdownMenu";

export default function Header() {

    const scrollDiv: MutableRefObject<(HTMLDivElement | null)> = useRef(null);
    const overlayRef = useRef(null);
    const navLinks: MutableRefObject<(HTMLLIElement | null)[]> = useRef([]);
    const navBar: MutableRefObject<(HTMLUListElement | null)> = useRef(null);
    const indicatorBar: MutableRefObject<(null | HTMLDivElement)> = useRef(null);
    const currentPathName = usePathname();
    const [ isLoading, setIsLoading ] = useState( true );

    /*Aqui atualizamos a posição da barra indicadora e tambem os stylos do link ativo sempre que o usuario muda de pagina*/
   useEffect(() => {
    navLinks.current.forEach( link => {
        if ([ '/series', '/movies', '/search', '/', '/favorites' ].includes( currentPathName )) {
            if ( currentPathName === `/${link?.id}` ) {
                if ( link ) {
                    const navBarCoordinates = navBar.current?.getBoundingClientRect();
                    const linkCoordinates = link.getBoundingClientRect();
                    if ( navBarCoordinates?.left && linkCoordinates.left && indicatorBar.current ) {
                        const activeLinkCoordinates = linkCoordinates.left - navBarCoordinates.left;
                        const indicatorBarStyles = {
                            width: `${linkCoordinates.width}px`,
                            left: `${( activeLinkCoordinates ).toFixed(0)}px`,
                        };
                        Object.assign( link?.style, { color: '#FFFF13' });
                        Object.assign( indicatorBar.current?.style, indicatorBarStyles );
                    };
                };
            } else {
               link && Object.assign( link?.style, { color: 'white' });
            };
            return
        };

        indicatorBar.current && Object.assign( indicatorBar.current?.style, { width: '0px' });
        link && Object.assign( link?.style, { color: 'white' });

    });
   },[ currentPathName ]);

    //Atualiza o estilo do header conforme a pagina e rolada
   const scrollHandler = () => {
        if ( scrollDiv.current ) {
            if ( window.scrollY > 50 ) {
                const updateStyles = { 
                    backgroundColor: '#16142B',
                };

                Object.assign( scrollDiv.current.style, updateStyles );
                return
            };
            
            const updateStyles = { 
                backgroundColor: 'transparent',
                backgroundImage: 'linear-gradient(to bottom, #020515, transparent)'
            };

            Object.assign( scrollDiv.current.style, updateStyles );
        };   
    };

    useEffect(() => {
        if ( typeof window !== undefined ) {
            scrollHandler();
            window.addEventListener('scroll', scrollHandler);
            window.addEventListener('resize', scrollHandler);
        };

        setIsLoading( false );
    },[]);


    return (
        <MobileMenu>
                <header style={{ opacity: !isLoading ? 1 : 0 }} className="font-inter fixed top-0 left-1/2 -translate-x-1/2 h-36 md:h-auto z-20 w-full before:w-full before:absolute before:top-0 before:left-0 before:h-full before:bg-gradient-to-b before:-z-10 max-w-[2200px] ease-linear duration-200">
                    <nav ref={scrollDiv} className="w-full flex flex-row justify-between items-center px-4 py-5 md:px-6 md:py-0 h-20 lg:px-8 md:justify-start md:gap-x-10">

                        {/* Menu em dispositivos moveis*/}
                        <label htmlFor="my-drawer" className="md:hidden">
                            <nav className="flex flex-col gap-y-[6pt] justify-center items *:w-8 *:h-0.5 *:rounded-3xl *:bg-white">
                                <div></div>
                                <div></div>
                                <div></div>
                            </nav>
                        </label>

                        <div >
                            <h1 className="text-2xl font-bold md:text-[25px] font-raleway">Zillus</h1>
                        </div>

                        {/* Barra de navegação */}
                        <nav className="flex flex-row items-center font-semibold">
                            <ul  ref={navBar} className="flex flex-row w-fit items-center *:text-primary-tx justify-end gap-x-10 relative">
                                
                                <li key='li-element-1' id="" className="hidden md:flex text-[19px] cursor-pointer lg:text-xl" ref={(e) => { navLinks.current[0] = e }}>
                                    <Link href='/' className="flex items-center gap-x-2">
                                        Inicio
                                    </Link>
                                </li>

                                <li key='li-element-2' id='movies' className="hidden md:inline text-[19px] cursor-pointer lg:text-xl" ref={(e) => { navLinks.current[1] = e }}>
                                    <Link href='/movies' className="flex items-center gap-x-2">
                                        Filmes
                                    </Link>
                                </li>

                                <li key='li-element-3' id='series' className="hidden md:flex text-[19px] cursor-pointer lg:text-xl" ref={(e) => { navLinks.current[2] = e }}>
                                    <Link href='/series' className="flex items-center gap-x-2">
                                        Series
                                    </Link>
                                </li>

                                <li key='li-element-4' id="favorites" className="hidden w-full text-[19px] lg:flex lg:text-xl" ref={(e) => { navLinks.current[3] = e }}>
                                    <Link href='/favorites' className="flex items-center gap-x-2">
                                        Favoritos
                                    </Link>
                                </li>

                                <li key='li-element-5' id='search' className="inline w-full md:text-neutral-400 text-white lg:text-xl" ref={(e) => { navLinks.current[4] = e }}>
                                    <div className="h-10 w-10 border border-neutral-400 rounded-md">
                                        <LuSearch className="max-[768px]:text-white text-4xl md:text-2xl"/>
                                    </div>
                                </li>

                                <div ref={indicatorBar} className="hidden absolute -bottom-[5px] w-0 h-0.5 bg-primary rounded-lg left-0 duration-200 ease-in-out"></div>
                            </ul>
                        </nav>

                        {/* Menu de opções para acessar a conta */}
                        <div className="hidden md:flex items-center gap-x-10 md:w-full md:justify-end">
                            <button 
                                className="h-10 rounded-md bg-secondary text-black px-4 text-sm font-bold xl:text-base">
                                Criar conta
                            </button>
                            <button className="text-primary-tx text-sm font-bold xl:text-base">
                                Entrar
                            </button>
                        </div>
                        {/* <AccountDropdown/> */}
                    </nav>

                    <div ref={overlayRef} className="menu-overlay"></div>
                    
                </header>
        </MobileMenu>
    )
};

