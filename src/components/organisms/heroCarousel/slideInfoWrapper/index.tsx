// hooks
import { useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import useLanguage from '@/hooks/lang'
// translations
import translations from '@/i18n/translations/buttons/translations.json';
// componentes
import Title from "../title";
import Logo from "../logo";
import Description from "../description";
import PlayButton from "@/components/atoms/playButton";
import AddToListButton from "@/components/molecules/addToListButton";
import Genres from '../genres';
// tipos
import { TmdbMediaProps } from "@/app/types";
import { ComponentPropsWithRef } from 'react';
type ComponentProps = { slideData: TmdbMediaProps | undefined } & ComponentPropsWithRef<'div'>;
// icones
import { FaPlay } from 'react-icons/fa';
// contexto
import { GlobalContext } from '@/contexts/global';
// utilitarios
import { tmdbConfig } from '@/app/constants';
import { getLogoPath } from '@/utils/tmdbApiData/getLogoPath';

export default function SlideInfoWrapper(props: ComponentProps) {
    const { className, slideData, ...rest } = props;
    const { dispatch } = useContext(GlobalContext);
    const { push } = useRouter();
    const { high_resolution_logo } = tmdbConfig;
    const logo = getLogoPath(slideData?.images.logos, slideData?.id);
    const genres: string = slideData?.genres.map((genre: TmdbMediaProps) => (genre.name)).filter((_: string, index: number) => index < 2).join(', ');
    const lang = useLanguage().language.code;
    const text = translations[lang];

    // lida com a nevegaçao entre paginas
    const navigateToPlayer = useCallback((): void => {
        if (!slideData) return;
        dispatch({ type: 'IS_LOADING_ACTIVE', payload: true });
        push(`/player/${slideData.media_type}/${slideData.id}`);
    }, [push, slideData]);

    return slideData && (
        <div {...rest} className={`slide-details w-full page-padding page-max-width flex flex-col items-center z-10 absolute mx-auto bottom-10 sm:pointer-events-none sm:-mt-0 sm:bottom-[clamp(116px,17.2vw,166px)] left-0 sm:items-start 2xl:left-1/2 2xl:-translate-x-1/2 ${className}`}>
            {/* titulo*/}
            {logo ?
                <Logo
                    src={high_resolution_logo + logo.path}
                    alt={`Logo ${slideData.media_type === 'movie' ? 'do filme' : 'da série'} ${slideData.title ?? slideData.name}`}
                    className='slide-logo mb-4  order-1'
                />
                :
                <Title className='mb-4 order-1'>{slideData.name ?? slideData.title}</Title>
            }
            <Description className='sm:h-0 lg:h-auto order-2 '>{slideData.overview}</Description>
            <div className='mt-4 flex items-center gap-x-4 order-3 sm:order-4 lg:order-3'>
                {/* ver detalhes */}
                <PlayButton onClick={navigateToPlayer}>
                    <FaPlay className='w-4 h-4' />
                    {
                        slideData.media_type === 'movie' ? 
                        text.go_to_movie : text.go_to_series 
                    }
                </PlayButton>
                {/* Adicionar aos favoritos */}
                <AddToListButton />
            </div>
            {/* generos */}
            <Genres className='mt-4 order-4 sm:order-3 sm:mt-0 lg:mt-4 lg:order-4 '>
                <span className="font-bold">{text.genre}</span>: {genres}
            </Genres>
        </div>
    );
};