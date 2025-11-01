// icones
import { PiShareFatBold } from "react-icons/pi";
// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
type ComponentProps = {
    className?: string;
    media: tmdbObjProps;
};
// componentes
import { toast } from "react-toastify";

export default function ShareButton(props: ComponentProps) {
    const { className, media } = props;

    const showErrorMsg = (msg: string) => {
        toast.error(msg, { position: 'bottom-right', autoClose: 3000 });
    };

    const showSuccessMsg = (msg: string) => {
        toast.success(msg, { position: 'bottom-right', autoClose: 3000 });
    };

    // lida com o compartilhamento de filmes e series em dispositivos mobile
    const shareMedia = async () => {
        const url = `${window.location.origin}/player/${media.media_type}/${media.id}`
        if (navigator.share) {
            try {
                await navigator.share({
                    title: media.title ?? media.name,
                    text: media.overview ?? 'Explore tudo sobre este título: atores, direção, curiosidades, bilheteria e onde assistir.',
                    url,
                })
            } catch (error) {
                console.log(`Erro ao compartilhar ${media.media_type}`, error);
                showErrorMsg(`Erro ao compartilhar ${media.media_type}`);
            }
        } else {
            navigator.clipboard.writeText(url)
            showSuccessMsg("Link copiado para a área de transferência ✅");
        };
    };

    const copyLink = () => {
        const url = `${window.location.origin}/player/${media.media_type}/${media.id}`
        navigator.clipboard.writeText(url);
        showSuccessMsg("Link copiado! ✅");
    };

    return (
        <>
            <PiShareFatBold onClick={shareMedia} className={`md:hidden ${className}`} />
            <PiShareFatBold onClick={copyLink} className={`hidden md:[display:initial] ${className}`} />
        </>
    );
};