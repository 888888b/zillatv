// hooks
import {  useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
// componente
import Image from "next/image";
// estilo
import './styles.css';
// props
type SearchBarProps = {
    className?: string;
    callback?: () => void;
    animation?: boolean;
};

export default function SearchBar(props: SearchBarProps) {

    const { push } = useRouter();
    const { className, callback, animation } = props;
    const pathname = usePathname();
    const inputBoxRef = useRef<HTMLFormElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const resetBtnRef = useRef<HTMLButtonElement | null>(null);

    // ativada sempre que o mouse sai da area da barra de pesquisa 
    const onMouseOutSearchBar = useCallback((): void => {
        const box = inputBoxRef.current;
        if (!box) return;
        const value = new FormData(box).get('search-input');
        if (value) return;
        box.classList.remove('active-searchbar');
    }, [inputBoxRef]);

    // reseta e fecha o input
    const onResetInput = useCallback(() => {
        const input = inputRef.current;
        const reset = resetBtnRef.current;
        if (!reset || !input) return;
        input.value = '';
        reset.style.display = 'none';
        onMouseOutSearchBar();
        if (pathname !== '/') push('/');
    }, [resetBtnRef, push, inputRef, pathname]);

    // reseta o input sempre que a pagina muda
    useEffect(() => {
        if (pathname !== '/search') onResetInput();
    }, [pathname, inputRef]);

    // ativada sempre que o mouse entra da area da barra de pesquisa 
    const onMouseOverSearchBar = useCallback((): void => {
        const box = inputBoxRef.current;
        if (!box) return;
        box.classList.add('active-searchbar');
    }, [inputBoxRef]);

    // atualiza a pagina de pesquisa com o valor do input
    const onInputValueChange = useCallback(() => {
        const input = inputRef.current
        const reset = resetBtnRef.current;
        if (!input || !reset) return;
        if (input.value) {
            push(`/search?keyword=${input.value}`);
            reset.style.display = 'flex';
        } else {
            push('/');
            reset.style.display = 'none';
        };
        onMouseOverSearchBar();
        callback && callback();
    }, [callback, push, inputRef, resetBtnRef, onMouseOverSearchBar]);

    // adiciona os eventos de mouse para que a animaçao funcione
    const mouseEvents = animation ? {
        onMouseEnter: onMouseOverSearchBar,
        onMouseLeave: onMouseOutSearchBar
    } : {};

    return (
        <form className={`rounded-md border-[0.1rem] overflow-hidden border-secondary/15 relative hover:border-secondary/40 transition-all duration-300 w-10 h-10 lg:w-12 lg:h-12 ${className}`} onSubmit={(e) => e.preventDefault()} {...mouseEvents} ref={inputBoxRef}>
            {/* icone de lupa */}
            <Image
                src={'/search_icon.png'}
                alt={'search icon'}
                width={24}
                height={24}
                className="absolute top-1/2 -translate-y-1/2 left-5 lg:left-[22px] -translate-x-1/2"
            />

            {/* campo de pesquisa */}
            <input
                type='text'
                name="search-input"
                className='appearance-none outline-none border-none h-full text-base text-secondary placeholder:text-text placeholder:font-normal w-full font-medium px-10 lg:px-12'
                placeholder='Buscar filmes e séries'
                autoComplete='additional-name webauthn'
                maxLength={70}
                ref={inputRef}
                onChange={onInputValueChange}
            />

            {/* reseta o input */}
            <button className="absolute top-1/2 -translate-y-1/2 right-5 lg:right-6 translate-x-1/2 bg-secondary w-6 h-6 rounded-full items-center justify-center active:scale-95 duration-300 transition-transform hidden cursor-pointer" ref={resetBtnRef} onClick={onResetInput}>
                <Image
                    src={'/close_icon.png'}
                    alt={'close icon'}
                    width={23}
                    height={23}
                />
            </button>
        </form>
    );
};