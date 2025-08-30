import { tmdbObjProps } from "@/contexts/tmdbContext";

export const sortByVoteAverageDesc = (items: tmdbObjProps[]): tmdbObjProps[] => {
  return [...items].sort((a, b) => b.vote_average - a.vote_average);
};