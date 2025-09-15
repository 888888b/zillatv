'use client';
// hooks
import { useEffect, useRef } from "react";
// componentes
import { CloseButton } from "@/components/atoms/closeButton";
import YoutubePlayer from '../youtubePlayer';

type ComponentProps = {
    title: string;
    mediaId: string;
    isPlayerActive: boolean;
    closePlayer: () => void;
};

export default function TrailerModal(props: ComponentProps) {
    const { isPlayerActive, mediaId, closePlayer } = props;
    const playerWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!document) return;
        document.body.style.overflow = isPlayerActive ? 'hidden' : 'initial';
    }, [isPlayerActive]);

    return (
        isPlayerActive && (
            // modal do player
            <div className="w-screen overflow-hidden h-lvh flex items-center justify-center fixed z-[999] top-0 left-0 bg-background/85 px-5 sm:px-10 lg:px-16">
                <div ref={playerWrapperRef} className="bg-surface w-full aspect-video max-h-[80vh] relative border-2 border-secondary/5">
                    {/* Fechamento do modal */}
                    <CloseButton onClick={closePlayer} />
                    {/* trailer do filme/serie */}
                    <YoutubePlayer videoID={mediaId} />
                </div>

                <div className="modal-backdrop bg-black/85"></div>
            </div>
        )
    );
};