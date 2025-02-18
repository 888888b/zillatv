'use client';

// hooks
import { useRef, useEffect, MouseEvent, useState } from 'react';
import useTmdbFetch from '@/components/hooks/tmdb';

// tipos
import { tmdbObjProps } from '@/components/contexts/tmdbContext';

// icones
import { FiSearch } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";

// funções utilitarias
import { handlePromise } from '@/components/utils/tmdbApiData/promise';
import { checkAvailability } from '@/components/utils/tmdbApiData/availability';
import ResultsSectionTitle from '@/components/molecules/resultSectionTitle';

// elementos
import SearchResults from '@/components/organisms/moviesSeriesSection';

import './styles.css';

export default function SearchPage() {

    const searchButtonsRef = useRef<(HTMLButtonElement |  null)[]>([]);
    const searchInputRef = useRef<(HTMLInputElement | null)>( null );
    const [ contentData, setContentData ] = useState<tmdbObjProps[]>([]);
    const [ selectedType, setSelectedType ] = useState( 'movie' );
    const [ isLoading, setIsLoading ] = useState( true );
    const { 
        fetchReleasedMovies, 
        fetchReleasedSeries, 
        fetchSerieByTerm, 
        fetchMovieByTerm 
    } = useTmdbFetch();

    const fetchReleaseContent = async ( type: string ) => {
        const content = [];

        if ( type === 'movie' ) {
            const movies = await handlePromise(fetchReleasedMovies());
            content.push( ...movies );
        };

        if ( type === 'serie' ) {
            const series = await handlePromise(fetchReleasedSeries());
            content.push( ...series );
        };
        
        const filtered = await checkAvailability( content );
        setContentData([ ...filtered ]);
    };

    /*Muda a cor do botão selecionado pelo usuario*/
    const handleSelectedButton = async ( event: MouseEvent<any>  ) => {
        const eventRef = ( event.target as HTMLButtonElement );

        // reseta o estilo botão não selecionado
        searchButtonsRef.current.forEach( element => {
            if ( element?.id !== eventRef.id ) {
                element?.style && Object.assign( element?.style, { 
                    backgroundColor: 'rgba(72, 61, 139, 0.2)', color: '#f5f5f5' 
                });
            };
        });

        // Aplica estilo ao botão selecionado
        Object.assign( eventRef.style, { backgroundColor: 'orangered', color: 'white' });
        setSelectedType( eventRef.id )

        // Verifica o valor do input e o id do botão selecionado para chamar uma função de busca de conteudo
        if ( searchInputRef.current ) {
            if ( searchInputRef.current.value.length < 3 ) {
                fetchReleaseContent( eventRef.id );
            }

            else {
                fetchContentByTerm(( searchInputRef.current?.value ?? ''), eventRef.id );
            };
        };
    };

    const fetchContentByTerm = async ( term: string, type: string ) => {
        const content = [];

        if ( type === 'movie' ) {
            const movies = await handlePromise(fetchMovieByTerm( term ));
            content.push( ...movies );
        };

        if ( type === 'serie' ) {
            const series = await handlePromise(fetchSerieByTerm( term ));
            content.push( ...series );
        };
        
        const filtered = await checkAvailability( content );
        setContentData([ ...filtered ]);
    };

    const resetSearchInput = async () => {
        if ( searchInputRef.current ) {
            Object.assign( searchInputRef.current, { value: null });
        };

        // Ao resetar o input, uma função de busca e chamada
        fetchReleaseContent( selectedType );
    };

    useEffect(() => {
        if ( searchButtonsRef.current[0] ) {
            Object.assign( searchButtonsRef.current[0].style, { 
                backgroundColor: 'orangered', color: 'white' 
            });
        };

        (async () => {
            const releasedMovies = await handlePromise(fetchReleasedMovies());
            const filtered = await checkAvailability( releasedMovies );
            setContentData([ ...filtered ]);
            setIsLoading( false );
        })();
    }, []);

    return (
        <section style={{ opacity: isLoading ? 0 : 1 }} className='search-page-container font-noto_sans'>
            <div className='w-full flex flex-col gap-y-3 z-[2]'>
                <div className='bg-darkslateblue/20 flex items-center rounded-md px-4 w-full'>
                    <FiSearch className='text-2xl text-neutral-100'/>
                    <input
                        type="text"
                        ref={searchInputRef}
                        onChange={(e) => { fetchContentByTerm( e.target.value, selectedType ) }}
                        placeholder='O que você esta procurando ?'
                        className='w-full h-[56px] bg-transparent text-white placeholder:text-neutral-300 px-4  text-[17px] lg:text-lg border-none outline-none'
                        required
                    />
                    <HiXMark 
                        onClick={resetSearchInput} 
                        className='text-neutral-100 text-2xl'
                    />
                </div>

                <div className='text-[17px] lg:text-lg'>
                    <button 
                        ref={(e) => { searchButtonsRef.current[0] = e }} 
                        className='h-9 px-7 rounded-md text-neutral-100 bg-darkslateblue/20 border-none outline-none'
                        onClick={(e) => { handleSelectedButton(e) }}
                        id='movie'
                        >Filmes
                    </button>

                    <button  
                        ref={(e) => { searchButtonsRef.current[1] = e }} 
                        className='ml-3 h-9 px-7 rounded-md text-neutral-100 bg-darkslateblue/20 border-none outline-none'
                        onClick={(e) => { handleSelectedButton(e) }}
                        id='serie'
                        >Series
                    </button>
                </div>
            </div>

            <div className='my-10 z-[3]'>
                <ResultsSectionTitle contentType={selectedType} searchTerm={searchInputRef.current?.value}/>
                <SearchResults typeOfId={selectedType} fetchData={contentData}/>
            </div>
        </section>
    )
};