'use client';

import { useContext, useEffect } from 'react';
import { GlobalContext } from '@/contexts/global';

export const StopLoading = () => {
    const {dispatch} = useContext(GlobalContext);
    useEffect(() => {
        dispatch({type: 'IS_LOADING_ACTIVE', payload: false});
    }, [dispatch]);
    return null;
};