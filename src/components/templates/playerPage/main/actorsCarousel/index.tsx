'use client';

// componentes
import EmblaCarousel from "@/components/organisms/emblaSlides";

// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";

import { tmdbConfig } from '@/app/constants';
import './styles.css';

type ComponentProps = {
    actorsData: tmdbObjProps[];
};

export default function MainActors(props: ComponentProps) {
    const {
        profile_photo_base_url
    } = tmdbConfig;

    return props.actorsData.some(actor => actor.profile_path) ? (
        <div className="mt-20 sm:mt-10 relative bg-depnight box-border w-full actors-carousel">
            {/* titulo do carousel */}
            <h3 className="text-2xl font-semibold mb-6">Elenco</h3>
            {/* container do carousel */}
            <EmblaCarousel
                navigationType="default"
                dragFree={true}
                slidesPerView={'auto'}>
                {/* ------------- */}
                {props.actorsData.map((actor: tmdbObjProps) => (
                    actor.profile_path ? (
                        // slide
                        <div className="embla__slide flex flex-col gap-y-5 items-center" key={actor.id}>
                            {/* imagem do ator/atora */}
                            <img
                                src={profile_photo_base_url + actor.profile_path}
                                alt={`Picture of actor ${actor.name}`}
                                className="object-cover w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden"
                                loading={'lazy'}
                            />

                            {/* detalhes sobre */}
                            <p className="text-center lg:text-lg font-normal text-neutral-300 flex flex-col gap-1 max-w-20">
                                {actor.name ?? ''}
                                <span className="text-primary">{actor.character ?? ''}</span>
                            </p>
                        </div>
                    ) : null
                ))}
            </EmblaCarousel>
        </div >
    ) : null
};