'use client';

// hooks
import { useState, useEffect, useContext } from "react";
import useTmdbFetch from "@/components/hooks/tmdb";

// tipos
import { tmdbObjProps } from "@/components/contexts/tmdbContext";

// contextos
import { UserDataContext } from "@/components/contexts/authenticationContext";

// componentes
import UnauthenticatedUserMsg from "./unauthenticatedUser";
import NoFavoritesMsg from "./emptyFavoritesList";
import FavoritesList from "./favoritesList";

// funções utilitarias
import { checkAvailability } from "@/components/utils/tmdbApiData/availability";

export default function FavoritesPage() {

    const [ contentData, setContentData ] = useState<tmdbObjProps[]>([]);
    const { 
        fetchMoviesByIdList, 
        fetchSeriesByIdList 
    } = useTmdbFetch();

    const {
        isLoggedIn,
        favoriteMovies,
        favoriteSeries
    } = useContext( UserDataContext );

    // Busca os filmes e series salvos como favoritos pelo usuario
    const fetchUserFavorites = async () => {
        const movies = [];
        const series = [];

        if ( favoriteMovies ) {
            const response = await fetchMoviesByIdList( favoriteMovies );
            movies.push( ...response );
        };

        if ( favoriteSeries ) {
            const response = await fetchSeriesByIdList( favoriteSeries );
            series.push( ...response );
        };

        const filtered = await checkAvailability([ ...movies, ...series ]);
        setContentData( filtered );
    };

    useEffect(() => {
        if ( isLoggedIn ) {
            if ( favoriteMovies || favoriteSeries ) {
                fetchUserFavorites();
                return;
            };
            
            setContentData([]);
        };

    }, [ favoriteMovies, favoriteSeries, isLoggedIn ]);

    // Caso o usuario não estaja authenticado
    if ( !isLoggedIn ) {
        return (
            <UnauthenticatedUserMsg/>
        );
    };

    // Caso o usuario estaja authenticado, mas não tenha favoritos
    if ( !contentData.length ) {
        return (
            <NoFavoritesMsg/>
        );
    };

    // Caso o usuario estaja authenticado, e tenha favoritos
    return (
        <FavoritesList contentData={contentData}/>
    );
};