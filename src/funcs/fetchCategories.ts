export const fetchCategories = async (): Promise<string[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    "Owned movies",
    "Action",
    "Comedy",
    "Thriller",
    "Sci-Fi",
    "Drama",
    "Fantasy",
    "Horror",
    "Documentary",
    "Romance",
    "Animation",
    "Crime",
    "Adventure",
    "Family",
    "Mystery",
    "History",
    "Biography",
    "Music",
    "War",
    "Western",
  ];
};
