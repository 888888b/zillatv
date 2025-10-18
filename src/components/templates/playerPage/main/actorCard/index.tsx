import { tmdbConfig } from "@/app/constants";
type ComponentProps = { path: string | undefined, actor: string };
import { RiUser6Line } from "react-icons/ri";
import { HiMiniUser } from "react-icons/hi2";

const ActorCard = (props: ComponentProps) => {
    const { profile_photo_base_url } = tmdbConfig;
    return (
        props.path ? 
            <img
                src={profile_photo_base_url + props.path}
                alt={`Imagem do ator/atora ${props.actor}`}
                className="object-cover w-[clamp(4.5rem,8.8vw,5.3rem)] aspect-square rounded-full overflow-hidden lg:w-[clamp(5.3rem,6vw,6rem)]"
                loading={'lazy'}
            />
            :
            <div className="w-[clamp(4.5rem,8.8vw,5.3rem)] aspect-square rounded-full overflow-hidden lg:w-[clamp(5.3rem,6vw,6rem)] bg-secondary/5 text-[clamp(90px,10.8vw,110px)] lg:text-[clamp(110px,7.5vw,120px)] text-secondary/40 relative flex justify-center items-center">
                <HiMiniUser className="absolute -bottom-[clamp(28px,3.6vw,36px)] left-1/2 -translate-x-1/2"/>
            </div>
    );
};
export default ActorCard;