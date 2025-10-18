import { StreamingsInfo } from "..";

export const searchStreamingsById = async (id: string): Promise<StreamingsInfo[] | undefined> => {
    const token = process.env.WATCH_MODE_API_KEY;
    try {
        const response = await fetch(`https://api.watchmode.com/v1/title/${id}/sources/?apiKey=${token}&regions=BR`, {
            cache: 'force-cache',
            next: { revalidate: 3600 }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        };
    } catch (error) {
        console.error('Watchmode: Erro ao buscar streamings.' + error);
    };
};