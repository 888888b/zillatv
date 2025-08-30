import { tmdbObjProps } from "@/contexts/tmdbContext";
type ComponentProps = {
    genresList: tmdbObjProps[];
    className?: string;
};

export const Genres = (props: ComponentProps) => {
    const {genresList, className} = props;

    return (
        <p className={`text-base leading-6 line-clamp-1 overflow-ellipsis sm:max-w-[40%] lg:max-w-[30%] md:hover:max-w-none ${className}`}>
            <span className="font-bold">Gêneros: </span>
            {genresList.map((genre) => (genre.name)).join(', ')}
        </p>
    );
};

export default Genres;