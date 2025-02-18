// hooks
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import useFirebase from '@/components/hooks/firebase';

// tipos
import { tmdbObjProps } from "@/components/contexts/tmdbContext";

// icones
import { FaPlay, FaStar } from "react-icons/fa";

// contextos
import { UserDataContext } from '@/components/contexts/authenticationContext';
import { GlobalEventsContext } from '@/components/contexts/globalEventsContext';

// funções utilitarias
import { getReleaseDate } from '@/components/utils/tmdbApiData/releaseDate';

// elementos
import FavoriteButton from '@/components/molecules/favoriteButton';

import { tmdbConfig } from '@/app/constants';

import './styles.css';

type ComponentProps = {
    fetchData: tmdbObjProps[];
    typeOfId: string;
};

export default function MoviesSeriesSection( props: ComponentProps ) {

    const router = useRouter();
    const { typeOfId } = props;
    const {
        favoriteMovies,
        favoriteSeries,
        isLoggedIn
    } = useContext( UserDataContext );
    
    const { 
        addUserFavoritesToDb, 
        deleteUserFavoritesOnDb 
    } = useFirebase();

    const { setModalsController } = useContext( GlobalEventsContext );

    const nextNavigate = ( content: tmdbObjProps ) => {
        router.push(`player/${typeOfId}/${content.id}`, { scroll: true });
    };

    // Define se o filme/serie e favorito ou nao, caso seja, salva no banco de dados
    const updateUserFavorites = async ( contentId: string ) => {
        if ( isLoggedIn ) {
            if (!favoriteMovies?.includes(contentId) && !favoriteSeries?.includes(contentId)) {
                addUserFavoritesToDb( contentId, typeOfId );
                return;
            };
            
            deleteUserFavoritesOnDb( contentId, typeOfId );
            return;
        }; 

        setModalsController( prev => ({
            ...prev,
            isRegisterModalActive: !prev.isRegisterModalActive,
            formInstructionsMessage: 'Faça login ou crie uma conta para adicionar filmes e series aos seus favoritos'
        }));    
    };

    return props.fetchData[0] ? (
        <>
            <div className='movie-serie-section-container'>
                { props.fetchData.map(( content, index ) => (
                    <div key={`${content.id}-${index}`}>
                        <div className='card'>
                            {/* Opção para adicionar o filme/serie aos favoritos */}
                            <FavoriteButton
                                updateFavorites={updateUserFavorites}
                                buttonId={content.id}
                                isFavorite={favoriteMovies?.includes(content.id) || favoriteSeries?.includes(content.id) ? true : false}
                            />

                            <div className='play-icon-box'>
                                <FaPlay className="text-richblack text-lg translate-x-px" onClick={() => {nextNavigate( content )}} />
                            </div>

                            <div onClick={() => {nextNavigate( content )}} className='image-box'>
                                {/* Imagem do conteudo */}
                                <img
                                    src={content.poster_path ? `${tmdbConfig.low_resolution_poster}${content.poster_path}` : `${tmdbConfig.low_resolution_backdrop}${content.backdrop_path}`}
                                    alt={`${content.title ?? content.name} serie/movie presentation image`}
                                    className="image"
                                    loading='lazy'
                                />
                            </div>
                        </div>

                        {/* Container de informações sobre o conteudo */}
                        <div className="mt-2 relative">
                            {/* Titulo */}
                            <p className="font-raleway font-bold text-[15px] text-white line-clamp-1 xl:text-lg">
                                { content.title ?? content.name }
                            </p>

                            <div className="flex items-center gap-x-3 font-normal font-noto_sans text-neutral-400 text-[15px] xl:text-[17px]">
                                {/* Data de lançamento */}
                                <p>
                                    {getReleaseDate( content.release_date ?? content.first_air_date )}
                                </p>

                                {/* Nota do publico ao conteudo */}
                                <p className="flex items-center gap-x-1">
                                    <FaStar className=""/> 
                                    {( content.vote_average).toFixed(0 )}/10
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    ) : null;
};