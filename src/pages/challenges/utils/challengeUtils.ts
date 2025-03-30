
import { Challenge } from "@/utils/challenge/types";

export type SortOption = "newest" | "oldest" | "az" | "za" | "popular" | "difficulty";

export const sortChallenges = (challenges: Challenge[], sortOption: SortOption) => {
  const sortedChallenges = [...challenges];

  switch (sortOption) {
    case "newest":
      // Sort by newest (assuming there's a date field, we'll use ID as a fallback)
      return sortedChallenges.sort((a, b) => Number(b.id) - Number(a.id));
    case "oldest":
      // Sort by oldest
      return sortedChallenges.sort((a, b) => Number(a.id) - Number(b.id));
    case "az":
      // Sort alphabetically A-Z
      return sortedChallenges.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      // Sort alphabetically Z-A
      return sortedChallenges.sort((a, b) => b.title.localeCompare(a.title));
    case "popular":
      // Sort by popularity (using progress as a proxy for popularity)
      return sortedChallenges.sort((a, b) => b.progress - a.progress);
    case "difficulty":
      // Sort by difficulty level
      const difficultyOrder: { [key: string]: number } = {
        beginner: 1,
        intermediate: 2,
        advanced: 3,
        expert: 4
      };
      return sortedChallenges.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    default:
      return sortedChallenges;
  }
};

export const filterChallenges = (
  challenges: Challenge[],
  searchTerm: string,
  categories: string[]
) => {
  return challenges.filter((challenge) => {
    // Filter by search term
    const matchesSearchTerm =
      searchTerm === "" ||
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by categories
    const matchesCategory =
      categories.length === 0 || categories.includes(challenge.category);

    return matchesSearchTerm && matchesCategory;
  });
};
