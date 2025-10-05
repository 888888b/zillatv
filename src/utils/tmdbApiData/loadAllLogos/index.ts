// tipos
export type Path = { path: string, slide: string };
// utilitarios
import { tmdbConfig } from "@/app/constants";

export const loadAllLogos = async (logos: Path[]): Promise<Path[]> => {
    const {ImageBasePath} = tmdbConfig;
    const resolvedPaths = await Promise.all(logos.map(logo => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            Object.assign(image, {
                src: `${ImageBasePath}/w500${logo.path}`,
                loading: 'eager',
                onload: () => resolve({ path: image.src, slide: logo.slide }),
                onerror: () => reject(`Error ao carregar imagem: ${logo.path}`)
            });
        });
    })) as Path[];
    return resolvedPaths;
};