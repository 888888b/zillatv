// hooks
import { useCallback, useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';
// translations
import translations from '@/i18n/translations/buttons/translations.json';
// componentes
import Title from "../title";
import Logo from "../logo";
import Description from "../description";
import PlayButton from "@/components/molecules/playButton";
import Genres from '../genres';
// tipos
import { Path } from '@/utils/tmdb/getLogoPath';
import { TmdbMediaProps } from "@/app/[lang]/types";
import { LangCode } from '@/i18n/languages';
import { ComponentPropsWithRef } from 'react';
type ComponentProps = {
    data: TmdbMediaProps;
    lang: string;
    logo: Path | undefined;
    pageWidth: number;
} & ComponentPropsWithRef<'div'>;
// icones
import { FaPlay } from 'react-icons/fa';
// contexto
import { GlobalContext } from '@/contexts/global';
// utilitarios
import { tmdbConfig } from '@/app/[lang]/constants';

export default function SlideInfoWrapper(props: ComponentProps) {
    const {
        className,
        data,
        pageWidth,
        lang,
        logo,
        ...rest
    } = props;
    const text = translations[lang as LangCode];
    const { dispatch } = useContext(GlobalContext);
    const { push } = useRouter();
    const { high_resolution_logo, medium_resolution_logo } = tmdbConfig;
    const genres = useMemo(() => {
        return data.genres
            .map((g: Record<string, string>) => g.name)
            .slice(0, 2)
            .join(', ');
    }, [data]);
    const quality = pageWidth < 1600 ? 'low' : 'high';

    // lida com a nevegaçao entre paginas
    const navigateToPlayer = useCallback((): void => {
        if (!data) return;
        dispatch({ type: 'IS_LOADING_ACTIVE', payload: true });
        push(`/${lang.toLowerCase()}/player/${data.media_type}/${data.id}`);
    }, [push, data, lang]);

    const getPath = useCallback((path: string, quality: "low" | "high"): string => {
        return quality === 'low' ? medium_resolution_logo + path :
            high_resolution_logo + path;
    }, []);

    const mediaTitle = useMemo(() => {
        return logo ?
            <Logo
                src={getPath(logo.path, quality)}
                alt={`Logo ${data.media_type === 'movie' ? 'do filme' : 'da série'} ${data.title ?? data.name}`}
                className='slide-logo  order-1'
                loading='eager'
                decoding='sync'
            />
            :
            <Title className='order-1'>{data.name ?? data.title}</Title>
    }, [logo, data, quality]);

    return data && pageWidth && (
        <div {...rest} className={`slide-details w-full page-padding page-max-width flex flex-col gap-y-4 
        items-center z-10 absolute mx-auto bottom-10 sm:pointer-events-none sm:mt-0 sm:bottom-[calc(56vw*0.25)] 
        left-0 sm:items-start 2xl:left-1/2 2xl:-translate-x-1/2 ${className}`}>
            {/* titulo*/} 
            {mediaTitle}
            {/* desrcição */}
            {data.overview && (pageWidth < 640 || pageWidth > 1023) &&
                <Description className='sm:h-0 lg:h-auto order-2 '>
                    {data.overview}
                </Description>
            }

            <div className='flex items-center gap-x-4 order-3 sm:order-4 lg:order-3'>
                {/* ver detalhes */}
                <PlayButton onClick={navigateToPlayer}>
                    {/* <FaPlay className='text-[clamp(1rem,2vw,1.25rem)] lg:text-[clamp(1.25rem,1.5vw,1.5rem)]' /> */}
                    {
                        data.media_type === 'movie' ?
                            text.go_to_movie : text.go_to_series
                    }
                </PlayButton>
                {/* Adicionar aos favoritos */}
                {/* <AddToListButton
                    mediaId={data.id}
                    mediaType={data.media_type}
                /> */}
            </div>

            {/* generos */}
            <Genres className='order-4 sm:order-3 sm:mt-0 lg:order-4 '>
                <span className="font-bold">{text.genre}</span>: {genres}
            </Genres>
        </div>
    );
};