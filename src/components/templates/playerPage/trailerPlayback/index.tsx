'use client';

// hooks
import { useEffect } from "react";

// componentes
import { CloseButton } from "@/components/atoms/closeButton";

type ComponentProps = {
    title: string;
    mediaId?: string;
    isPlayerActive: boolean;
    closePlayer: () => void;
};

export default function PlayerModal(props: ComponentProps) {
    const { isPlayerActive, mediaId, title, closePlayer } = props;

    useEffect(() => {
        if (!document) return;
        document.body.style.overflow = isPlayerActive ? 'hidden' : 'initial';
    },[isPlayerActive]);

    return (
        isPlayerActive && (
            // modal do player
            <div className="w-screen overflow-hidden h-lvh flex items-center justify-center fixed z-[999] top-0 left-0 bg-background/85">
                <div className="bg-surface max-w-[calc(100%-40px)] sm:max-w-[calc(100%-80px)] md:max-w-none rounded-md flex flex-col gap-y-5 relative border-2 border-secondary/5">
                    {/* Fechamento do modal */}
                    <CloseButton onClick={closePlayer} />

                    {/* trailer do filme/serie */}
                    {mediaId ? (
                        <div className="w-screen max-w-full min-h-[200px] max-h-[65vh] aspect-video md:max-w-[600px] rounded-mdlg:max-w-none lg:w-[70vw] overflow-hidden">
                            <iframe
                                width={'100%'}
                                height={'100%'}
                                className="border-none"
                                src={`https://www.youtube.com/embed/${mediaId}?autoplay=1`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
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
        )
    );
};