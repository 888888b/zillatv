import { TmdbMediaProps } from "@/app/[lang]/types";

export const makeMediaUnique = (medias: TmdbMediaProps[]) => {
    return Array.from(
        new Map(medias.map(media => [media.id, media])).values()
    );
};