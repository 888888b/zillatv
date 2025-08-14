'use client';

import { useContext, useEffect } from 'react';
import { GlobalEventsContext } from '@/contexts/globalEventsContext';
import './styles.css';

export default function Loading() {
    const { isLoadingActive } = useContext(GlobalEventsContext);

    useEffect(() => {
        if (!document) return;
        const overflow = isLoadingActive ? 'hidden' : 'visible';
        document.body.style.overflowY = overflow;
    }, [isLoadingActive]);

    return (
        <div className={`loading-wrapper fixed top-0 z-[1000] left-0 w-screen h-lvh bg-background flex items-center justify-center ${isLoadingActive && 'show'}`}>
            <div className='svg-loading-box'>
                <svg viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        </div>
    );
};