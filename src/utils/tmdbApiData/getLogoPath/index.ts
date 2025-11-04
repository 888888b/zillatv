import { TmdbMediaProps } from '@/app/types';
export type Path = { path: string, slide: string };

// filtra a lista de imagens de logo buscando por uma imagem em portugues (caso houver logos disponiveis)
export const getLogoPath = (logos: TmdbMediaProps[], slideId: string): Path | undefined => {
    if (!Array.isArray(logos) || !logos) return;
    const preferredOrder = ['pt', 'pt-BR', 'en'];
    const logo = preferredOrder.map(lang => logos.find(logo => logo.iso_639_1 === lang)).find(Boolean);
    const filePath: string | undefined = logo?.file_path;
    if (!filePath) return;
    return { path: filePath, slide: slideId };
};
