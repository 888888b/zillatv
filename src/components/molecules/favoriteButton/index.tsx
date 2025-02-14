import { HTMLAttributes, useState, useEffect } from 'react';

import { FaRegHeart, FaHeart } from "react-icons/fa";

import './styles.css';

type ComponentProps = {
    isFavorite: boolean
    buttonId: string
    mediaType?: string 
    updateFavorites: ( itemId: string, mediaType: string ) => void
} & HTMLAttributes<HTMLButtonElement>

export default function FavoriteButton( props: ComponentProps ) {

    const [ isLoading, setIsLoading ] = useState( false );
    const { 
        updateFavorites,
        buttonId,
        mediaType,
        isFavorite,
        className,
        ...rest
    } = props;

    useEffect(() => {
        setIsLoading( false );
    }, [ props.isFavorite ]);

    const handleFavoriteButton = () => {
        updateFavorites( buttonId, mediaType ?? 'movie' );
        setIsLoading( true );
    };

    return (
        <button 
            { ...rest } 
            className={`favorite-button ${className}`}
            onClick={handleFavoriteButton}
            >
            { isLoading ? (
                <span className='loading loading-bars loading-md absolute top-[10px] right-3'></span>
            ) : (
                <>
                    <FaRegHeart 
                        className={`${isFavorite ? "hidden" : "inline"} text-white absolute top-3 right-3 text-[22px]`}
                    />
                    <FaHeart 
                        className={`${isFavorite ? "inline" : "hidden"} text-orangered absolute top-3 right-3 text-[22px]`}
                    />
                </>
            )}
        </button>
    );
};