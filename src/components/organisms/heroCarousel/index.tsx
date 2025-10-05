'use client';
// hooks
import { useState, useCallback, useContext, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// componentes
import EmblaCarousel from '@/components/organisms/emblaSlides';
import PlayButton from '@/components/atoms/playButton';
import AddToListButton from '@/components/molecules/addToListButton';
import Title from './title';
import Description from './description';
import Genres from './genres';
import Logo from './logo';
import dynamic from 'next/dynamic';
const SlideImage = dynamic(() => import('../../atoms/heroImage/index'), { ssr: true });
// icons
import { FaPlay } from "react-icons/fa";
// contexto
import { GlobalEventsContext } from '@/contexts/globalEventsContext';
// utilitarios
import { getLogoPath } from '@/utils/tmdbApiData/getLogoPath';
import { loadAllLogos } from '@/utils/tmdbApiData/loadAllLogos';
// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';
import { Path } from '@/utils/tmdbApiData/loadAllLogos';
type HeaderCarouselProps = {
    currentPage: 'home' | 'movies' | 'series';
    slidesData: tmdbObjProps[] | undefined
};
type SlideDetails = {
    title: string;
    description: string;
    genres: string;
    logo: string | undefined;
};
type UpdateTitle = {title: string, logo: string | undefined};
type CurrentSlide = {id: number, type: string};
// outros
import './styles.css';

export default function HeaderCarousel(props: HeaderCarouselProps) {
    const { push } = useRouter();
    const { slidesData, currentPage } = props;
    const { dispatch } = useContext(GlobalEventsContext);
    const [logos, setLogos] = useState<Path[] | null>(null);
    const [currentSlide, setCurrentSlide] = useState<CurrentSlide | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descriptionRef = useRef<HTMLParagraphElement | null>(null);
    const genresRef = useRef<HTMLParagraphElement | null>(null);
    const logoRef = useRef<HTMLImageElement | null>(null);
    const componentRef = useRef<HTMLElement | null>(null);

    // lida com a nevegaçao entre paginas
    const navigateToPlayer = useCallback((): void => {
        dispatch({ type: 'IS_LOADING_ACTIVE', payload: true });
        if (!currentSlide) return;
        const {type, id} = currentSlide;
        push(`/player/${type}/${id}`);
    }, [push, currentSlide]);

    // controla a troca de titulo do slide / alterna entre texto e imagem
    const updateSlideTitle = (props: UpdateTitle): void => {
        const { title, logo } = props;
        if (!titleRef.current || !logoRef.current) return;
        if (logo) {
            titleRef.current.classList.add('disabled-title');
            logoRef.current.src = logo;
            logoRef.current.alt = `Logo do filme/serie ${title}`;
            logoRef.current.classList.remove('disabled-logo');
        } else {
            logoRef.current.classList.add('disabled-logo');
            titleRef.current.innerText = title;
            titleRef.current.classList.remove('disabled-title');
        };
    };

    // pre-carrega as logos apos o load da pagina  
    useEffect(() => {
        const el = componentRef.current;
        if (el) el.classList.add('loading-slides-logos');
        const getAllLogos = async () => {
            if (!slidesData) return;
            const paths: Path[] = slidesData.map(slide => (getLogoPath(slide.images.logos, slide.id))).filter(logo => logo !== undefined);
            const logos = await loadAllLogos(paths);
            setLogos([...logos]);
            if (el) el.classList.remove('loading-slides-logos');
            const logo = logos?.find(logo => logo.slide === slidesData[0].id)?.path;
            const title: string = slidesData[0].title ?? slidesData[0].name;
            updateSlideTitle({title, logo});
        };
        getAllLogos();
    }, [slidesData]);

    // atualiza os dados sobre o slide ativo na tela
    const updateSlideDetails = (props: SlideDetails): void => {
        const { title, description, genres, logo } = props;
        if (!titleRef.current || !descriptionRef.current || !genresRef.current || !logoRef.current ) return;
        updateSlideTitle({title, logo});
        descriptionRef.current.innerText = description;
        genresRef.current.innerHTML = `<span class="font-bold">Gêneros</span>: ${genres}`;
    }; 

    // recebe o index do slide ativo na tela
    const handleScrollAnimation = useCallback((index: number): void => {
        if (!slidesData) return;
        const slideId: number = slidesData[index].id;
        const slideType: string = slidesData[index].media_type;
        console.log(slidesData);
        setCurrentSlide({id: slideId, type: slideType});
        const logo = logos?.find(logo => Number(logo.slide) === slideId)?.path;
        const title: string = slidesData[index].title ?? slidesData[index].name;
        const description: string = slidesData[index].overview;
        const genres: string = slidesData[index].genres.map((genre: tmdbObjProps) => (genre.name)).filter((_: string, index: number) => index < 2).join(', ');
        updateSlideDetails({ title, description, genres, logo });
    }, [slidesData, setCurrentSlide, updateSlideDetails, logos]);

    return slidesData ? (
        <section className='hero-carousel' ref={componentRef}>
            <EmblaCarousel
                navigationType="header"
                slidesPerView={1}
                autoplay={true}
                loop={true}
                duration={25}
                selectedSnap={handleScrollAnimation}>
                {/* Gerando slides apartir da resposta da api do TMDB */}
                {slidesData.map((slide, index) => (
                    // Container da imagem do slide
                    <div
                        key={`hero-slide-${slide.id}-${currentPage}`}
                        className='embla__slide'>
                        <SlideImage slideData={slide} className='slide-img' />
                    </div>
                ))}
            </EmblaCarousel>

            {/* detalhes do filme/serie */}
            <div className="slide-details w-full page-padding page-max-width flex flex-col items-center z-10 absolute mx-auto bottom-10 sm:pointer-events-none sm:-mt-0 sm:bottom-[clamp(116px,17.2vw,166px)] left-0 sm:items-start 2xl:left-1/2 2xl:-translate-x-1/2">
                {/* titulo*/}
                <Title ref={titleRef} className='mb-4 order-1' />
                <Logo ref={logoRef} className='slide-logo mb-4  order-1' />
                <Description ref={descriptionRef} className='sm:h-0 lg:h-auto order-2 ' />
                <div className='mt-4 flex items-center gap-x-4 order-3 sm:order-4 lg:order-3'>
                    {/* ver detalhes */}
                    <PlayButton onClick={navigateToPlayer}>
                        <FaPlay className='w-4 h-4' />
                        Assistir Trailer
                    </PlayButton>
                    {/* Adicionar aos favoritos */}
                    <AddToListButton />
                </div>
                {/* generos */}
                <Genres ref={genresRef} className='mt-4 order-4 sm:order-3 sm:mt-0 lg:mt-4 lg:order-4 ' />
            </div>
        </section>
    ) : null;
};