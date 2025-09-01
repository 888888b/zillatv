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
            {genresList.length >= 2 ? 
            genresList[0].name + ', ' + genresList[1].name
            :
            genresList[0].name
            }
        </p>
    );
};

export default Genres;