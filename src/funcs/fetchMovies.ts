import dummyMovies from "../dummyMovies";

export type Movie = (typeof dummyMovies)[number];

export const fetchMovies = async (
  sortBy?: string,
  filterByCategories?: string[],
  searchText?: string,
  page: number = 0,
  itemsPerPage: number = 10,
  excludeId?: string,
  signal?: AbortSignal
): Promise<Movie[]> => {
  await new Promise((res, rej) => {
    const timer = setTimeout(res, 2000);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      rej(new DOMException("Aborted", "AbortError"));
    });
  });

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;

  return dummyMovies.filter((c) => c.id !== excludeId).slice(start, end);
};

export const fetchNewestMovies = async (
  amountOfMovies: number
): Promise<Movie[]> => {
  await new Promise((res) => setTimeout(res, 1000));

  return [...dummyMovies]
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    )
    .slice(0, amountOfMovies);
};

export const fetchMostPopularMovies = async (
  amountOfMovies: number
): Promise<Movie[]> => {
  await new Promise((res) => setTimeout(res, 1000));

  return [...dummyMovies]
    .sort((a, b) => b.views - a.views)
    .slice(0, amountOfMovies);
};

export const fetchMovieById = async (
  id: string
): Promise<Movie | undefined> => {
  await new Promise((res) => setTimeout(res, 1000));
  return dummyMovies.find((movie) => movie.id === id);
};

export const fetchMoviesByIds = async (ids: string[]): Promise<Movie[]> => {
  await new Promise((res) => setTimeout(res, 1000));
  return dummyMovies.filter((movie) => ids.includes(movie.id));
};
