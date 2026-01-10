// hooks
import { useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
// traduções
import translations from '@/i18n/translations/buttons/translations.json';
// componentes
import Image from "next/image";
import { SearchIcon } from "@/components/atoms/searchIcon";
// tipos
import { LangCode } from "@/i18n/languages";
import { set } from "zod";
type ComponentProps = {
    className?: string;
    callback?: () => void;
    lang: string;
};

export default function SearchBar(props: ComponentProps) {
    const { push } = useRouter();
    const { className, callback, lang } = props;
    const pathname = usePathname();
    const searchbarRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const resetBtnRef = useRef<HTMLButtonElement | null>(null);
    const text = translations[lang as LangCode];
    const lowerCaseLang = lang.toLowerCase();

    // Adiciona / remove classe pra controle de fechamento/abertura da barra de pesquisa
    const setIsSearchbarFilled = (hasValue: boolean) => {
        const input = inputRef.current;
        if (!input) return;
        hasValue ? input.classList.add('has-value') : input.classList.remove('has-value');
    };

    // controla abertura/fechamento da search bar no mobile
    const setIsCheckboxChecked = (isChecked: boolean) => {
        const checkbox = document.getElementById('search-bar-checkbox') as HTMLInputElement | null;
        if (!checkbox) return;
        isChecked ? checkbox.checked = true : checkbox.checked = false;
    };

    const onResetInput = useCallback((): void => {
        const input = inputRef.current;
        const reset = resetBtnRef.current;
        if (!reset || !input) return;
        if (input.value) input.value = '';
        setIsSearchbarFilled(false);
        setIsCheckboxChecked(false);
        callback && callback();
    }, [
        callback,
        resetBtnRef,
        inputRef,
        pathname,
        setIsSearchbarFilled,
        setIsCheckboxChecked
    ]);

    // reseta o input sempre que a pagina muda
    useEffect(() => {
        if (pathname !== `/${lowerCaseLang}/search`) onResetInput();
    }, [pathname]);

    // atualiza a pagina de pesquisa com o valor do input
    const onInputChange = useCallback((): void => {
        const input = inputRef.current
        const searchbar = searchbarRef.current;
        if (!input || !searchbar) return;
        if (input.value.length > 0) {
            setIsSearchbarFilled(true)
            push(`/${lowerCaseLang}/search?keyword=${input.value}`);
        } else {
            setIsSearchbarFilled(false);
            setIsCheckboxChecked(false);
            push(`/${lowerCaseLang}/home`);
        };
    }, [
        push, 
        inputRef, 
        lowerCaseLang, 
        searchbarRef, 
        setIsCheckboxChecked, 
        setIsSearchbarFilled
    ]);

    // reseta o input e retorna ao home
    const returnToHome = useCallback(() => {
        onResetInput();
        if (pathname === `/${lowerCaseLang}/search`) push(`/${lowerCaseLang}/home`);
    }, [onResetInput, push, pathname]);

    return (
        // barra de pesquisa
        <div className="search-bar bg-background relative flex-1" ref={searchbarRef}>
            <SearchIcon
                size={24}
                pathClass="stroke-0"
                className="absolute top-1/2 -translate-y-1/2 left-5 md:left-[19px] lg:left-[22px] -translate-x-1/2"
            />

            <form
                className={`flex items-center rounded-(--radius-button) border
                border-secondary relative h-10 text-text ${className}`}
                onSubmit={(e) => e.preventDefault()}>
                {/* campo de pesquisa */}
                <input
                    type='text'
                    name="search-input"
                    className='appearance-none outline-none border-none h-full text-[clamp(1rem,1.15vw,1.0625rem)] text-secondary 
                    placeholder:text-text-500 font-normal
                    overflow-visible block w-full absolute top-1/2
                    -translate-y-1/2 -left-1 px-10 lg:px-12'
                    placeholder={text.search_movies_series}
                    maxLength={70}
                    ref={inputRef}
                    onChange={onInputChange}
                />

                {/* texto do placeholder (invisivel) para forçar o tamanho da barra de pesquisa */}
                <p className="text-[clamp(1rem,1.15vw,1.125rem)] px-10 lg:px-14 font-normal invisible pointer-events-none 
                whitespace-nowrap">
                    {text.search_movies_series}
                </p>
            </form>

            {/* reseta o input */}
            <button
                type='button'
                className={`absolute top-1/2 -translate-y-1/2 right-5 lg:right-6 translate-x-1/2 
                    bg-secondary w-6 h-6 rounded-full items-center justify-center active:scale-95 duration-300 
                    transition-transform cursor-pointer flex`} ref={resetBtnRef}
                onClick={returnToHome}>
                <Image
                    src={'/close_icon.png'}
                    alt={'close icon'}
                    width={23}
                    height={23}
                />
            </button>
        </div>
    );
};