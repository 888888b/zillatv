'use client';
// componentes
import EmblaCarousel from "@/components/organisms/emblaSlides";
import { ActorImage } from "../actorImage";
// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
type ComponentProps = { actorsData: tmdbObjProps[], className?: string };

export default function MainActors(props: ComponentProps) {
    const { actorsData, className } = props;

    return (
        <div className={`w-full actors-carousel ${className}`}>
            {/* container do carousel */}
            <EmblaCarousel
                navigationType="default"
                dragFree={true}
                slidesPerView={'auto'}>
                {actorsData.map((actor: tmdbObjProps) => (
                    actor.profile_path ? (
                        // slide
                        <div className="embla__slide flex flex-col gap-y-5 items-center" key={actor.id}>
                            {/* imagem do ator/atora */}
                            <ActorImage path={actor.profile_path} actor={actor.name} />
                            {/* detalhes sobre */}
                            <p className="text-center [font-size:clamp(1rem,1.15vw,1.125rem)] lg:[font-size:clamp(1.125rem,1.3vw,1.25rem)] font-normal text-text max-w-20 line-clamp-5 overflow-ellipsis">
                                {actor.name ?? ''}
                                <span className="text-primary mt-1 block overflow-ellipsis">
                                    {actor.character ?? ''}
                                </span>
                            </p>
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div >
    )
};