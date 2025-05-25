import moviesData from "../dummyMovies";

export const fetchMovies = async (
  sortBy: string,
  filterByCategories: string[],
  searchText: string,
  page: number,
  itemsPerPage: number
): Promise<typeof moviesData> => {
  // simulate network delay
  await new Promise((res) => setTimeout(res, 2000));

  // for now, filters and searchText are ignored
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;

  return moviesData.slice(start, end);
};
