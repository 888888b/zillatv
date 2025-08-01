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
            className="object-cover w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden"
            loading={'lazy'}
        />
    );
};