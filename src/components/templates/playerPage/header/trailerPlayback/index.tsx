'use client';

// hooks
import { useRef, useState } from "react";

// icones
import { IoPlay, IoClose } from "react-icons/io5";

// componentes
import { createPortal } from 'react-dom';

type ComponentProps = {
    contentName: string;
    contentId: string;
};

export default function WatchTrailer(props: ComponentProps) {

    const checkboxInputRef = useRef<(HTMLInputElement | null)>( null );
    const [isPlayerVisible, setisPlayerVisible] = useState( false );

    // controla o modal do player
    const checkboxToggle = () => {
        checkboxInputRef.current?.click();
        setisPlayerVisible(prev => !prev);
    };

    return (
        <>
            {/* aciona o player */}
            <button
                onClick={checkboxToggle}
                className='outline-none border-none w-full btn rounded-[4px] bg-primary  hover:bg-primary text-black text-base font-bold sm:w-64 sm:rounded-[7px]'>
                <IoPlay className="text-xl" />
                Assistir ao trailer
            </button>

            {/* renderiza o modal em outro nó do dom para evitar sobreposição por outros elementos como o header */}
            { document && createPortal(
                <>
                    {/* input que controla o modal */}
                    <input ref={checkboxInputRef} type="checkbox" id="my_modal_6" className="modal-toggle" />
                    {isPlayerVisible && (
                        // modal do player
                        <div className="modal" role="dialog">
                            <div className="bg-darkpurple max-w-[calc(100%-32px)] w-fit p-4 rounded-md flex flex-col gap-y-4 relative modal-box box-border overflow-visible">
                                {/* Titulo do trailer */}
                                <p className="overflow-hidden line-clamp-2 font-medium text-lg text-white">
                                    {props.contentName} - Trailer
                                </p>

                                {/* Fechamento do modal */}
                                <div 
                                    onClick={checkboxToggle} 
                                    className="w-10 h-10 rounded-full flex items-center justify-center absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 cursor-pointer border-none outline-none bg-primary">
                                    <IoClose className="text-xl text-black" />
                                </div>

                                {/* trailer do filme/serie */}
                                {props.contentId ? (
                                    <iframe
                                        width={'100%'}
                                        height={'100%'}
                                        className="rounded-md md:w-[50vw] min-h-72 max-h-[80vh] aspect-video"
                                        src={`https://www.youtube.com/embed/${props.contentId}?autoplay=1`}
                                        title="YouTube video player"
                                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                ) : (
                                    // mensagem de aviso caso nao haja trailer disponivel
                                    <div className="w-[85vw] md:w-[50vw] h-72 flex items-center justify-center bg-darkpurple max-h-[80vh] aspect-video">
                                        <p 
                                            className="text-base text-neutral-100 leading-relaxed font-normal text-center">
                                            <span className="text-2xl text-white font-semibold">Desculpe!</span> 
                                            <br /> 
                                            não foi possível carregar o conteúdo
                                        </p>
                                    </div>
                                )}

                            </div>

                            <div className="modal-backdrop bg-black/85"></div>
                        </div>
                    )}
                </>, 
            document.body )}
        </>
    );
};