import { ComponentPropsWithRef, useState, useEffect } from 'react';
import { BookmarkIcon } from '@/components/atoms/bookmarkIcon';

type ComponentProps = ComponentPropsWithRef<'button'> & {
    isFavorite: boolean;
    buttonId: string;
    mediaType?: string;
    updateFavorites: ( itemId: string, mediaType: string ) => void
}

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
        setIsLoading(false);
    }, [props.isFavorite]);

    const handleFavoriteButton = () => {
        updateFavorites(buttonId, mediaType ?? 'movie');
        setIsLoading(true);
    };

    return (
        <button
            {...rest}
            className={`favorite-button z-30 absolute top-3 right-3 w-fit h-fit cursor-pointer text-text hover:text-secondary ${className}`}
            onClick={handleFavoriteButton}
        >
            {isLoading ? (
                <span className='loading loading-bars loading-lg'></span>
            ) : (
                <BookmarkIcon/>
            )}
        </button>
    );
};