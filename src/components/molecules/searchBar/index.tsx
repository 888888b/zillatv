// hooks
import { FormEvent, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// icones
import { RiSearch2Line } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";

type SearchBarProps = {
    className?: string
    callback?: () => void
};

export default function SearchBar( props: SearchBarProps ) {

    const [ searchInputValue, setSearchInputValue ] = useState('');
    const { push, refresh } = useRouter();
    const pathname = usePathname();
    const { className, callback } = props;

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

    return (
        <div style={{ animationTimingFunction: 'ease' }} className={`rounded-[10px] border-[0.1rem] overflow-hidden border-white/20 relative hover:border-white/40 duration-300 ${className}`}>
            {/* icone de lupa */}
            <RiSearch2Line
                className='text-2xl text-white absolute top-1/2 -translate-y-1/2 left-2 z-[2]'
            />

            <form className="h-full" onSubmit={handleFormSubmit}>
                <input
                    type='text'
                    name="search"
                    className='appearance-none outline-none border-none h-full text-base text-white placeholder:text-neutral-400 w-full px-10 font-medium bg-transparent'
                    placeholder='Buscar filmes, series...'
                    autoComplete='additional-name webauthn'
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                    required
                />
            </form>

            {/* icone de X, reseta o input */}
            <IoCloseCircle
                className='text-2xl text-white absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                style={{
                    display: searchInputValue.length ? 'inline' : 'none'
                }}
                onClick={() => setSearchInputValue('')}
            />
        </div>
    );
};