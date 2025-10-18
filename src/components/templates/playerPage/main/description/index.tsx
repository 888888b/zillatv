
// hooks
import { useRef, useState, useCallback, useEffect } from 'react';

const Description = ({ overview }: { overview: string }) => {
    const descriptionRef = useRef<HTMLParagraphElement | null>(null);
    const [isTextCut, setIsTextCut] = useState<boolean>(false);
    const textChangeButton = useRef<HTMLButtonElement | null>(null);

    // controla a apariçao completa ou parcial do texto a depender do tamanho
    const showEntireText = useCallback(() => {
        const text = descriptionRef.current;
        const button = textChangeButton.current;
        if (!text || !button) return;
        if (text.classList.contains('line-clamp-6')) {
            text.classList.remove('line-clamp-6');
            button.innerHTML = 'Ver menos';
        } else {
            text.classList.add('line-clamp-6');
            button.innerHTML = 'Ver mais';
        };
    }, [descriptionRef, textChangeButton]);

    // define se o texto precisa ou nao de um botao VER MAIS / VER MENOS
    useEffect(() => {
        const text = descriptionRef.current;
        if (!text) return;
        const textLineHeight = parseFloat(getComputedStyle(text).lineHeight);
        const lines = text.scrollHeight / textLineHeight;
        setIsTextCut(lines > 6);
    }, [descriptionRef, textChangeButton]);

    return (
        <div className="flex flex-col w-full md:max-w-3xl lg:max-w-[850px] 2xl:max-w-[1000px] gap-y-[10px] box-border page-padding">
            <p ref={descriptionRef} className='w-full line-clamp-6 [font-size:clamp(1.125rem,1.9vw,1.1875rem)] lg:[font-size:clamp(1.1875rem,1.3vw,1.25rem)] relative'>
                {overview}
            </p>
            {isTextCut &&
                <button
                    className="[font-size:clamp(0.875rem,1.05vw,1rem)] border-2 border-secondary/10 outline-none text-secondary font-semibold uppercase h-10 flex items-center justify-center cursor-pointer"
                    onClick={showEntireText}
                    ref={textChangeButton}> 
                    ver mais
                </button>
            }
        </div>
    );
};
export default Description;