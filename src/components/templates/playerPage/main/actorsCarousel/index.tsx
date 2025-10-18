'use client';
// componentes
import EmblaCarousel from "@/components/organisms/emblaSlides";
import ActorCard from "../actorCard";
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
                    // slide
                    <div className="embla__slide flex flex-col gap-y-3 items-center bg-secondary/10 lg:bg-surface rounded-md p-4" key={actor.id}>
                        {/* imagem do ator/atora */}
                        <ActorCard path={actor.profile_path} actor={actor.name} />
                        {/* detalhes sobre */}
                        <p className="text-center [font-size:clamp(1rem,1.7vw,1.0625rem)] lg:[font-size:clamp(1.0625rem,1.2vw,1.1875rem)] font-normal line-clamp-3 overflow-ellipsis">
                            {actor.name}
                            <span className="text-secondary/90 block overflow-ellipsis font-semibold">
                                {actor.character ?? ''}
                            </span>
                        </p>
                    </div>
                ))}
            </EmblaCarousel>
        </div >
    )
};