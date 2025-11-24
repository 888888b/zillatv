import { TmdbMediaProps } from "@/app/[lang]/types";

export const sortByVoteAverageDesc = (items: TmdbMediaProps[]): TmdbMediaProps[] => {
  return [...items].sort((a, b) => b.vote_average - a.vote_average);
};