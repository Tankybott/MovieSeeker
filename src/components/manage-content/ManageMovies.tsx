import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/utility/SearchInput";
import ExploreCategoryChooser from "../category-chooser/CategoryChooser";
import LoadingSpinner from "../../components/utility/LoadingSpinner";
import Pagination from "../../components/utility/Pagination";
import { fetchMovies, Movie } from "../../funcs/fetchMovies";
import { fetchCategories } from "../../funcs/fetchCategories";

const ManageMovies: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const allCategoriesRef = useRef<string[]>([]);
  const [categoriesFetched, setCategoriesFetched] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesFetched, setMoviesFetched] = useState(false);

  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 20;
  const totalItems = 125;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    if (!categoriesFetched) {
      fetchCategories()
        .then((result) => {
          allCategoriesRef.current = result;
          setCategoriesFetched(true);
        })
        .catch(() => {});
    }
  }, [categoriesFetched]);

  useEffect(() => {
    setActivePage(0);
  }, [search, activeCategories]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, activeCategories, activePage]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setMoviesFetched(false);

    fetchMovies(
      "Newest",
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
      .catch(() => {});

    return () => {
      controller.abort();
    };
  }, [search, activeCategories, activePage]);

  const isLoading = !moviesFetched;

  const handleAddMovie = () => {
    navigate("/upsert-movie/0");
  };

  const handleEditMovie = (id: string) => {
    navigate(`/upsert-movie/${id}`);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="w-full lg:w-1/3 order-2 lg:order-1">
          <SearchInput setValue={setSearch} />
        </div>

        <button
          className="px-4 py-2 text-sm font-semibold rounded bg-main-gradient text-white shadow-highlight-glow transition hover:opacity-90 order-1 lg:order-2 w-full lg:w-auto"
          onClick={handleAddMovie}
        >
          Add New Movie
        </button>
      </div>

      <ExploreCategoryChooser
        allCategories={allCategoriesRef.current}
        activeCategories={activeCategories}
        setActiveCategories={setActiveCategories}
        disabled={!categoriesFetched}
      />

      <div className={`relative pt-2 ${isLoading ? "min-h-[60vh]" : ""}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <LoadingSpinner isOverlay={true} color="gray-950" />
          </div>
        )}

        {!isLoading && movies.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">
            No movies found.
          </p>
        )}

        {!isLoading && (
          <ul className="space-y-4">
            {movies.map((movie) => (
              <li
                key={`${movie.movieTitle}-${movie.movieYearOfRelese}`}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border border-gray-700 rounded-md p-4 bg-gray-800"
              >
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {movie.movieTitle}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Year: {movie.movieYearOfRelese}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Categories:{" "}
                    {movie.categories?.join(", ") || "no categories assigned"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-1 text-sm font-semibold rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                    onClick={() => handleEditMovie(movie.id)}
                  >
                    Edit
                  </button>
                  <button className="px-4 py-1 text-sm font-semibold rounded bg-red-600 text-white hover:bg-red-700 transition">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Pagination
        pageCount={pageCount}
        forcePage={activePage}
        onPageChange={setActivePage}
      />
    </div>
  );
};

export default ManageMovies;
