// hooks
import { MouseEvent, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// tipos
import { tmdbObjProps } from '../../contexts/tmdbContext';

import './styles.css';

type CategoryBarProps = {
    onSelectGenre: ( genre: string ) => void
    genresList: tmdbObjProps;
};

export default function CategoryBar( props: CategoryBarProps ) {

    const currentPathName = usePathname();
    const categoryElementsRef = useRef<(HTMLLIElement | null)[]>([]);

    /*Muda a cor do botão quando o usuario seleciona alguma categoria*/
    const updateListElementStyle = ( e: MouseEvent<any> ) => {
        props.onSelectGenre((e.target as HTMLLIElement).id);

        categoryElementsRef.current.forEach( element => {
            if ( element?.style ) {
                Object.assign( element.style, { 
                    backgroundColor: '#16142B', 
                    color: '#e5e5e5',
                    fontWeight: 500
                });
            };
        });

        Object.assign(( e.target as HTMLLIElement ).style, { 
            backgroundColor: '#ffff13', 
            color: 'black',
            fontWeight: 600
        });
    };

    useEffect(() => {
        // aplica a cor orangered ao primeiro elemento da lista de generos quando a pagina e carregada
        if (  categoryElementsRef.current[0] ) {
            Object.assign( categoryElementsRef.current[0].style, { 
                backgroundColor: '#ffff13', 
                color: 'black',
                fontWeight: 600
            });
        };
    },[]);

    // Gera uma lista de categorias que o usuario pode selecionar
    const categoriesList = Object.values( props.genresList ).map(( value, index ) => (
        <li 
            ref={(e) => { categoryElementsRef.current[index] = e }} 
            id={ value[0] }
            key={ `${currentPathName}-${value[0]}` } 
            onClick={ (e) => updateListElementStyle(e) }>
            { value[2] }
        </li>
    ));

    return (
        <ul 
            className='categories-list'>
            { categoriesList }
        </ul>
    );
};