// Obtem o tempo de duração do filme 
export const getRunTime = (runtime: number): string => {
    if (!runtime || runtime === 0) return '';
    if (runtime < 60) return `${runtime}m`;
    const hours = (runtime / 60).toFixed(0);
    const minites = runtime % 60;
    return `${hours}h ${minites}m`;
};