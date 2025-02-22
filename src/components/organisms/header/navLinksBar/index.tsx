// hooks
import { useRouter, usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

import './styles.css';

export default function NavLinksBar({ isUserLoggedIn }:{ isUserLoggedIn: boolean }) {

    const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);
    const { push } = useRouter();
    const pathname = usePathname();

    const updateLinkStyle = () => {
        navLinksRef.current.forEach( link => {
            if ( link && `/${link.id}` === pathname ) {
                Object.assign(link.style, { color: '#ffff13' });
            };

            if ( link && `/${link.id}` !== pathname && link ) {
                Object.assign(link.style, { color: 'white' });
            };
        });
    };

    useEffect(() => {
        updateLinkStyle();
    }, [ pathname ]);

    return (
        <nav className='hidden lg:block ml-10'>
            <ul className='text-lg flex gap-x-10 items-center *:cursor-pointer *:duration-300'>
                <li 
                    onClick={() => push('/')} 
                    className='hover:text-primary'
                    id=''
                    ref={(e) => {navLinksRef.current[0] = e}}>
                    Inicio
                </li>

                <li 
                    onClick={() => push('/movies')} 
                    className='hover:text-primary'
                    id="movies"
                    ref={(e) => {navLinksRef.current[1] = e}}>
                    Filmes
                </li>
                <li 
                    onClick={() => push('/series')} 
                    className='hover:text-primary'
                    id="series"
                    ref={(e) => {navLinksRef.current[2] = e}}>
                    Series
                </li>
                { isUserLoggedIn && (
                    <li 
                        onClick={() => push('/favorites')} 
                        className="hover:text-primary"
                        id="favorites"
                        ref={(e) => {navLinksRef.current[3] = e}}>
                        Favoritos
                    </li>
                )}
            </ul>
        </nav>
    );
};