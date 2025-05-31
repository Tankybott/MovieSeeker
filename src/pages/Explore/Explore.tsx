import { useEffect, useMemo, useRef, useState } from "react";
import SearchInput from "../../components/utility/SearchInput";
import FilterDropdown from "../../components/utility/FilterDropdown";
import ExploreCategoryChooser from "../../components/category-chooser/CategoryChooser";
import MovieCard from "../../components/utility/MovieCard";
import LoadingSpinner from "../../components/utility/LoadingSpinner";
import Pagination from "../../components/utility/Pagination";
import { fetchMovies } from "../../funcs/fetchMovies";
import { fetchCategories } from "../../funcs/fetchCategories";
import { Movie } from "../../funcs/fetchMovies";

const Explore: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Najnowsze");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const allCategoriesRef = useRef<string[]>([]);
  const [categoriesFetched, setCategoriesFetched] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesFetched, setMoviesFetched] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const [activePage, setActivePage] = useState(0);

  const itemsPerPage = 15;
  const totalItems = 125; // temporary dummy total
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Fetch categories once and store in ref
  useEffect(() => {
    if (!categoriesFetched) {
      fetchCategories().then((result) => {
        allCategoriesRef.current = result;
        setCategoriesFetched(true);
      });
    }
  }, [categoriesFetched]);

  // Reset page to 0 on filter changes
  useEffect(() => {
    setActivePage(0);
  }, [search, sort, activeCategories]);

  // Scroll to top when anything changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, sort, activeCategories, activePage]);

  // Fetch movies
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setMoviesFetched(false);
    setImagesLoaded(0);

    fetchMovies(
      sort,
      activeCategories,
      search,
      activePage,
      itemsPerPage,
      undefined,
      signal
    )
      .then((result) => {
        if (!signal.aborted) {
          setMovies(result);
          setMoviesFetched(true);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Fetching failed:", err);
        }
      });

    return () => {
      controller.abort();
    };
  }, [search, sort, activeCategories, activePage]);

  const totalImages = useMemo(() => movies.length, [movies]);
  const isLoading = !moviesFetched || imagesLoaded < totalImages;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <main className="w-full p-4 space-y-4">
      {/* Header controls */}
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mt-[4.2rem] lg:mt-5">
        <div className="w-full lg:w-1/3">
          <SearchInput setValue={setSearch} />
        </div>
        <div className="w-full lg:w-1/3">
          <FilterDropdown
            value={sort}
            setValue={setSort}
            options={[
              "Najnowsze",
              "Najbardziej popularne",
              "Najlepiej oceniane",
            ]}
          />
        </div>
      </div>

      {/* Category chooser */}
      <div className="pt-[1rem]">
        <ExploreCategoryChooser
          allCategories={allCategoriesRef.current}
          activeCategories={activeCategories}
          setActiveCategories={setActiveCategories}
          disabled={!categoriesFetched}
        />
      </div>

      {/* Movie Grid */}
      <div className={`relative pt-[1rem] ${isLoading ? "min-h-[80vh]" : ""}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <LoadingSpinner isOverlay={true} />
          </div>
        )}

        {!isLoading && movies.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">
            Nie znaleziono filmów.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={`${
                movie.movieTitle
              }-${activePage}-${sort}-${search}-${activeCategories.join(",")}`}
              cardImgUrl={movie.cardImgUrl}
              movieTitle={movie.movieTitle}
              redirectUrl={`/movies/${movie.id}`}
              movieYearOfRelese={movie.movieYearOfRelese}
              lengthOfMovieInMinutes={movie.LengthOfMovieInMinutes}
              setImageLoaded={handleImageLoad}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        pageCount={pageCount}
        forcePage={activePage}
        onPageChange={setActivePage}
      />
    </main>
  );
};

export default Explore;
