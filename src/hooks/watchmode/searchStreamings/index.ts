import { StreamingsInfo } from "..";

export const searchStreamingsById = async (
    id: string, lang: string = 'pt-BR'): Promise<StreamingsInfo[] | undefined> => {
    const token = process.env.WATCH_MODE_API_KEY;
    const region = lang.split('-')[1];

    try {
        const response = await fetch(`https://api.watchmode.com/v1/title/${id}/sources/?apiKey=${token}&regions=${region === 'BR' ? region : 'US'}`, {
            cache: 'force-cache',
            next: { revalidate: 3600 }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        };

    } catch (err) {
        console.error('Watchmode: Erro ao buscar streamings.' + err);
    };
};