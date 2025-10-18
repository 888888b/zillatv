import { searchInfoByTmdbId } from "./searchTitle";
import { searchStreamingsById } from "./searchStreamings";

export type TitleInfo = {[key: string]: string};
export type StreamingsInfo = {[key: string]: any};
export const watchmodeTypeTranslation: Record<string, string> = {
  rent: "Alugar",
  buy: "Comprar",
  sub: "Assinatura",
  free: "Grátis",
  tv_everywhere: "TV Everywhere",
  cinema: "Cinema",
};

export default function useWatchmode() {
    return {
        searchInfoByTmdbId,
        searchStreamingsById
    };
};