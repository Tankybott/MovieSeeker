import { useEffect, useRef, useState } from "react";
import SearchInput from "../../components/utility/SearchInput";
import LoadingSpinner from "../../components/utility/LoadingSpinner";
import Pagination from "../../components/utility/Pagination";

const ManageCategories: React.FC = () => {
  const [search, setSearch] = useState("");
  const allCategoriesRef = useRef<string[]>([]);
  const [categoriesFetched, setCategoriesFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 20;
  const totalItems = 125;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const fetchCategories = async (signal: AbortSignal): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        resolve([
          "Akcja",
          "Komedia",
          "Dramat",
          "Horror",
          "Thriller",
          "Sci-Fi",
          "Fantasy",
          "Dokument",
          "Romans",
          "Animacja",
          "Kryminał",
          "Przygodowy",
        ]);
      }, 500);

      signal.addEventListener("abort", () => {
        clearTimeout(timeout);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (!categoriesFetched) {
      setIsLoading(true);
      fetchCategories(signal)
        .then((result) => {
          allCategoriesRef.current = result;
          setCategoriesFetched(true);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setIsLoading(false);
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, [categoriesFetched]);

  useEffect(() => {
    setActivePage(0);
  }, [search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, activePage]);

  // ✅ Don't filter here — always use the full list.
  const currentPageItems = allCategoriesRef.current.slice(
    activePage * itemsPerPage,
    (activePage + 1) * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="w-full sm:w-1/3 order-2 sm:order-1">
          <SearchInput setValue={setSearch} placeholder="Szukaj kategorii..." />
        </div>
        <button
          className="order-1 sm:order-2 px-4 py-2 text-sm font-semibold rounded bg-main-gradient text-white shadow-highlight-glow transition hover:opacity-90"
          onClick={() => {}}
        >
          Dodaj nową kategorię
        </button>
      </div>

      {/* Content */}
      <div className={`relative pt-2 ${isLoading ? "min-h-[60vh]" : ""}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <LoadingSpinner isOverlay={true} color="gray-950" />
          </div>
        )}

        {!isLoading && currentPageItems.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">
            Nie znaleziono kategorii.
          </p>
        )}

        {!isLoading && (
          <ul className="space-y-4">
            {currentPageItems.map((category) => (
              <li
                key={category}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border border-gray-700 rounded-md p-4 bg-gray-800"
              >
                <h3 className="text-white font-semibold text-lg">{category}</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-1 text-sm font-semibold rounded bg-blue-500 text-white hover:bg-blue-600 transition">
                    Edytuj
                  </button>
                  <button className="px-4 py-1 text-sm font-semibold rounded bg-red-600 text-white hover:bg-red-700 transition">
                    Usuń
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        pageCount={pageCount}
        forcePage={activePage}
        onPageChange={setActivePage}
      />
    </div>
  );
};

export default ManageCategories;
