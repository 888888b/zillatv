// hooks
import { useContext, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// contexto
import { GlobalContext } from '@/contexts/global';

import './styles.css';

export default function NavLinksBar({ isUserLoggedIn }: { isUserLoggedIn: boolean }) {
    const { dispatch } = useContext(GlobalContext);
    const { push } = useRouter();
    const pagePath = usePathname();

    // ativa o loading e lida com a navegação
    const navigate = useCallback((path: string) => {
        if (path === pagePath) return;
        dispatch({type: 'IS_LOADING_ACTIVE', payload: true});
        push(path);
    }, [push, pagePath, dispatch]);

    return (
        <nav className='hidden lg:block'>
            <ul className='flex gap-x-[25px] items-center'>
                <li onClick={() => navigate('/')}>
                    Início
                </li>

                <li onClick={() => navigate('/movies')}>
                    Filmes
                </li>

                <li onClick={() => navigate('/series')}>
                    Séries
                </li>

                {isUserLoggedIn && (
                    <li onClick={() => navigate('/favorites')}>
                       Favoritos
                    </li>
                )}
            </ul>
        </nav>
    );
};