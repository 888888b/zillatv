// hooks
import {  useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
// translations
import translations from '@/i18n/translations/buttons/translations.json';
// componente
import Image from "next/image";
import { SearchIcon } from "@/components/atoms/searchIcon";
// estilo
import './styles.css';
// tipos
import { LangCode } from "@/i18n/languages";
type SearchBarProps = {
    className?: string;
    callback?: () => void;
    isAnimated?: boolean;
    lang: string;
};

export default function SearchBar(props: SearchBarProps) {
    const { push } = useRouter();
    const { className, callback, isAnimated, lang } = props;
    const pathname = usePathname();
    const inputBoxRef = useRef<HTMLFormElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const resetBtnRef = useRef<HTMLButtonElement | null>(null);
    const text = translations[lang as LangCode];
    const lowerCaseLang = lang.toLowerCase();

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
        if (input.value) input.value = '';
        if (isAnimated) reset.style.display = 'none';
        if (isAnimated) onMouseOutSearchBar();
        callback && callback();
    }, [callback, resetBtnRef, inputRef, pathname]);

    // reseta o input sempre que a pagina muda
    useEffect(() => {
        if (pathname !== `/${lowerCaseLang}/search`) onResetInput();
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
            push(`/${lowerCaseLang}/search?keyword=${input.value}`);
            if (isAnimated) reset.style.display = 'flex';
        } else {
            push(`/${lowerCaseLang}/home`);
            if (isAnimated) reset.style.display = 'none';
        };
        isAnimated && onMouseOverSearchBar();
    }, [push, inputRef, resetBtnRef, onMouseOverSearchBar]);

    // reseta o input e retorna ao home
    const returnToHome = useCallback(() => {
        onResetInput();
        if (pathname === `/${lowerCaseLang}/search`) push(`/${lowerCaseLang}/home`);
    }, [onResetInput, push, pathname]);

    // adiciona os eventos de mouse para que a animaçao funcione
    const inputMouseEvents = isAnimated ? {
        onMouseEnter: onMouseOverSearchBar,
        onMouseLeave: onMouseOutSearchBar
    } : {};

    return (
        <form className={`flex items-center rounded-(--radius-button) border-[0.1rem] overflow-hidden border-secondary/10 lg:border-secondary/40 relative h-12 text-text ${className}`} onSubmit={(e) => e.preventDefault()} {...inputMouseEvents} ref={inputBoxRef}>
            {/* icone de lupa */}
            <SearchIcon
                size={24}
                pathClass="stroke-0"
                className="absolute top-1/2 -translate-y-1/2 left-5 md:left-[19px] lg:left-[22px] -translate-x-1/2"
            />

            {/* campo de pesquisa */}
            <input
                type='text'
                name="search-input"
                className='appearance-none outline-none border-none h-full text-[clamp(1rem,1.15vw,1.125rem)] text-secondary placeholder:text-text lg:placeholder:text-secondary/70 placeholder:font-normal w-full font-medium lg:font-normal px-10 lg:px-12'
                placeholder={text.search_movies_series}
                autoComplete='additional-name webauthn'
                maxLength={70}
                ref={inputRef}
                onChange={onInputValueChange}
            />

            {/* reseta o input */}
            <button type='button' className={`absolute top-1/2 -translate-y-1/2 right-5 lg:right-6 translate-x-1/2 bg-secondary w-6 h-6 rounded-full items-center justify-center active:scale-95 duration-300 transition-transform cursor-pointer ${isAnimated ? 'hidden' : 'flex'}`} ref={resetBtnRef} onClick={returnToHome}>
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