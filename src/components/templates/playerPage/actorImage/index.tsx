import { tmdbConfig } from "@/app/constants";

type ComponentProps = {
    path: string;
    actor: string;
};

export const ActorImage = (props: ComponentProps) => {
    const {profile_photo_base_url} = tmdbConfig;
    return (
        <img
            src={profile_photo_base_url + props.path}
            alt={`Imagem do ator/atora ${props.actor}`}
            className="object-cover w-[clamp(5rem,6.05vw,6rem)] aspect-square rounded-full overflow-hidden lg:w-[clamp(6rem,7.05vw,7rem)]"
            loading={'lazy'}
        />
    );
};