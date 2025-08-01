'use client';

// componentes
import EmblaCarousel from "@/components/organisms/emblaSlides";
import { ActorImage } from "../actorImage";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

type ComponentProps = {
    actorsData: tmdbObjProps[];
    className?: string;
};

export default function MainActors(props: ComponentProps) {
    const {actorsData, className} = props;

    return (
        <div className={`w-full actors-carousel ${className}`}>
            {/* container do carousel */}
            <EmblaCarousel
                navigationType="default"
                dragFree={true}
                slidesPerView={'auto'}>
                {/* ------------- */}
                {actorsData.map((actor: tmdbObjProps) => (
                    actor.profile_path ? (
                        // slide
                        <div className="embla__slide flex flex-col gap-y-5 items-center" key={actor.id}>
                            {/* imagem do ator/atora */}
                            {/* image */}
                            <ActorImage path={actor.profile_path} actor={actor.name}/>

                            {/* detalhes sobre */}
                            <p className="text-center lg:text-lg text-base font-normal text-text flex flex-col gap-1 max-w-20">
                                {actor.name ?? ''}
                                <span className="text-primary">{actor.character ?? ''}</span>
                            </p>
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div >
    )
};