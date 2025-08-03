'use client'

import { useEffect } from 'react';

export const ScrollToTop = (): null => {
    useEffect(() => {
        if (!window) return;
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, []);

    return null;
};