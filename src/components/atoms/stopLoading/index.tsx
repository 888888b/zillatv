'use client';

import { useContext, useEffect } from 'react';
import { GlobalEventsContext } from '@/contexts/globalEventsContext';

export const StopLoading = () => {
    const {dispatch} = useContext(GlobalEventsContext);
    useEffect(() => {
        dispatch({type: 'IS_LOADING_ACTIVE', payload: false});
    }, [dispatch]);
    return null;
};