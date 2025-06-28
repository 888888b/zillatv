// hooks
import { FormEvent, MouseEvent, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// icones
import { IoCloseCircle } from "react-icons/io5";

import Image from "next/image";

type SearchBarProps = {
    className?: string;
    callback?: () => void;
    animation?: boolean;
};

export default function SearchBar( props: SearchBarProps ) {

    const [ searchInputValue, setSearchInputValue ] = useState('');
    const { push, refresh } = useRouter();
    const pathname = usePathname();
    const { className, callback, animation } = props;

    const handleFormSubmit = ( e:FormEvent ) => {
        e.preventDefault();
        push(`/search?keyword=${searchInputValue}`, {scroll: true});
        pathname === '/search' && refresh();
        callback && callback();
    };

    useEffect(() => {
        if ( pathname !== '/search' ) {
            setSearchInputValue('');
        };
    }, [ pathname ]);

    // ativada sempre que o mouse entra da area da barra de pesquisa 
    const onMouseOverSearchBar = (e: MouseEvent<HTMLDivElement>): void => {
        if ( searchInputValue.length ) return;
        e.currentTarget.style.width = '28vw';
    };

    // ativada sempre que o mouse sai da area da barra de pesquisa 
    const onMouseOutSearchBar = (e: MouseEvent<HTMLDivElement>): void => {
        if ( searchInputValue.length ) return;
        e.currentTarget.style.width = '48px';
    };

    // adiciona os eventos de mouse para que a animaçao funcione
    const mouseEvents = animation ? {
        onMouseEnter: onMouseOverSearchBar,
        onMouseLeave: onMouseOutSearchBar
    } : {};

    return (
        <div 
            style={{ animationTimingFunction: 'ease' }} 
            className={`rounded-lg border-[0.1rem] oerflow-hidden border-secondary/15 relative hover:border-secondary/40 transition-all duration-300 w-12 h-12 ${className}`}
            {...mouseEvents}>
            {/* icone de lupa */}
            <div className="w-12 h-12 flex items-center justify-center">
                <Image
                    src={'/search_icon.png'}
                    alt={'search icon'}
                    width={24}
                    height={24}
                    className="-translate-px"
                />
            </div>

            {/* input de pesquisa */}
            <form className="h-full absolute top-0 left-12 -translte-x-1/2 w-[calc(100%-96px)]" onSubmit={handleFormSubmit}>
                <input
                    type='text'
                    name="search"
                    className='appearance-none outline-none border-none h-full text-base text-secondary placeholder:text-text w-full font-medium bg-transparent'
                    placeholder='Buscar filmes e séries'
                    autoComplete='additional-name webauthn'
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                    required
                    
                />
            </form>

            <div className="w-6 h-6 rounded-full bg-secondary absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center" style={{display: searchInputValue.length ? 'inline' : 'none'}}>
                <Image
                    src={'/close_icon.png'}
                    alt={'close icon'}
                    width={23}
                    height={23}
                    onClick={() => setSearchInputValue('')}
                />
            </div>           
        </div>
    );
};