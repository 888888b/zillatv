import Link from 'next/link';
import './styles.css';

export default function NavLinksBar({ isUserLoggedIn }:{ isUserLoggedIn: boolean }) {

    return (
        <nav className='hidden lg:block'>
            <ul className='flex gap-x-[25px] items-center'>
                <li>
                    <Link href={'/'}>Início</Link>
                </li>

                <li>
                    <Link href={'/movies'}>Filmes</Link>
                </li>

                <li>
                    <Link href={'/series'}>Séries</Link>
                </li>

                { isUserLoggedIn && (
                    <li>
                        <Link href={'/favorites'}>Favoritos</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};