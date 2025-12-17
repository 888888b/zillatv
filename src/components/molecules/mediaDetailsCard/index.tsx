// translations
import translations from '@/i18n/translations/buttons/translations.json';
// icones
import { PiPlayBold, PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
// componentes
import { Tooltip } from "@/components/atoms/tooltip";
import ShareButton from '@/components/molecules/shareButton';
// tipos
import { TmdbMediaProps } from "@/app/[lang]/types";
import { LangCode } from '@/i18n/languages';
type ComponentProps = { 
    media: TmdbMediaProps;
    navigate: (mediaId: string, mediaType: string) => void;
    updateFavorites: (mediaId: string, mediaType: string, isFavorite: boolean) => void;
    lang: string
};

export default function DetailsCard(props: ComponentProps) {
    const {
        media, 
        navigate, 
        updateFavorites, 
        lang
    } = props;
    const text = translations[lang as LangCode];

    // obtem a nota do publico sobre o conteudo
    const getImdbReviews = (vote_average: number, vote_count: number) => {
        const reviewsCount = vote_count >= 1000 ?
            `${(vote_count / 1000).toFixed(0)}k` : vote_count
        return `${vote_average.toFixed(1)} (${reviewsCount})`;
    };

    return (
        <div className='media-details hidden lg:flex flex-col gap-2 absolute top-0 left-0 z-10 p-3 w-full h-full pointer-events-none font-medium text-[clamp(0.875rem,1vw,1rem)]'>
            {/* titulo */}
            <h3 className="text-secondary line-clamp-2">
                {media.title ?? media.name}
            </h3>
            {/* imdb - nota dos usuarios / caso estaja disponivel */}
            <div className="flex items-center flex-wrap gap-x-2">
                <img
                    src="/IMDB_icon.png"
                    alt="Icone do IMDB"
                    className="h-[clamp(2.5rem,2.75vw,2.75rem)]"
                />
                <p className='whitespace-nowrap'>
                    {getImdbReviews(media.vote_average, media.vote_count)}
                </p>
            </div>
            {/* descrição */}
            <p className='line-clamp-4 overflow-ellipsis text-secondary'>
                {media.overview}
            </p>
            {/* ações de usuario */}
            <div className='flex items-center gap-3 flex-nowrap text-2xl text-primary/70 *:hover:text-primary *:duration-200 *:transition-colors   *:ease-in-out pointer-events-auto mt-auto'>
                {/* ir para o player */}
                <Tooltip msg={text.watch}>
                    <PiPlayBold onClick={() => navigate(media.id, media.media_type)} />
                </Tooltip>
                {/* adicionar/remover dos favoritos */}
                {!media.isFavorite ?
                    <Tooltip msg={text.add_to_favorites}>
                        <PiBookmarkSimpleBold
                            onClick={() => updateFavorites(media.id, media.media_type, media.isFavorite)}
                        />
                    </Tooltip> :
                    <Tooltip msg={text.remove_from_favorites}>
                        <PiBookmarkSimpleFill
                            className='text-primary'
                            onClick={() => updateFavorites(media.id, media.media_type, media.isFavorite)}
                        />
                    </Tooltip>
                }
                {/* compartilhar */}
                <Tooltip msg={text.share}>
                    <ShareButton media={media}/>
                </Tooltip>
            </div>
        </div>
    );
};