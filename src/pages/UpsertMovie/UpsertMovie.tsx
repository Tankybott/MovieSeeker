import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ValidatedInput from "../../components/utility/ValidatedInput";
import ValidatedTextarea from "../../components/utility/ValidatedTextArea";
import PhotoUploader from "../../components/upsert-movie/PhotoUploader";
import CategoryChooser from "../../components/category-chooser/CategoryChooser";
import LoadingSpinner from "../../components/utility/LoadingSpinner";

import { fetchMovieById } from "../../funcs/fetchMovies";
import { fetchCategories } from "../../funcs/fetchCategories";
import { isNotEmpty, isNumberInRange } from "../../funcs/ValidationFuncs";

const UpsertMovie = () => {
  const { id: rawId } = useParams<{ id?: string }>();
  const id = rawId ?? "";
  const isEditMode = id !== "" && id !== "0";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [defaultValues, setDefaultValues] = useState<Record<string, string>>(
    {}
  );
  const [globalError, setGlobalError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [categoriesFetched, setCategoriesFetched] = useState(false);
  const [movieFetched, setMovieFetched] = useState(!isEditMode);

  const allCategoriesRef = useRef<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const refs = useRef<
    Record<string, { validate: () => boolean; clear: () => void }>
  >({});
  const posterRef = useRef<{ validate: () => boolean }>(null);

  useEffect(() => {
    fetchCategories().then((categories) => {
      allCategoriesRef.current = categories;
      setCategoriesFetched(true);
    });

    if (!isEditMode) return;

    fetchMovieById(id).then((movie) => {
      if (!movie) return;

      setDefaultValues({
        movieTitle: movie.movieTitle,
        movieYearOfRelese: movie.movieYearOfRelese.toString(),
        LengthOfMovieInMinutes: movie.LengthOfMovieInMinutes.toString(),
        director: movie.director,
        buyingPrice: movie.buyingPrice.toString(),
        rentalPrice: movie.rentalPrice.toString(),
        description: movie.description,
        cardImgUrl: movie.cardImgUrl,
      });

      setActiveCategories(movie.categories);
      posterRef.current = { validate: () => true };
      setMovieFetched(true);
    });
  }, [id, isEditMode]);

  useEffect(() => {
    if (categoriesFetched && movieFetched) {
      setLoading(false);
    }
  }, [categoriesFetched, movieFetched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    setCategoryError("");

    let allValid = true;

    for (const key in refs.current) {
      const isValid = refs.current[key]?.validate();
      if (!isValid) allValid = false;
    }

    if (!posterRef.current?.validate()) allValid = false;

    if (activeCategories.length === 0) {
      setCategoryError("You must select at least one category.");
      allValid = false;
    }

    if (!allValid) {
      setGlobalError("Fix form errors before saving.");
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const payload: Record<string, string> = {};
    Object.keys(refs.current).forEach((key) => {
      payload[key] = formData.get(key)?.toString() || "";
    });

    setSaving(true);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      setSaving(false);
      setGlobalError(
        isSuccess
          ? "Changes saved successfully."
          : "Something went wrong. Please try again later."
      );
    }, 1500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-8 text-white min-h-[70vh]">
      {loading && <LoadingSpinner isOverlay={false} />}
      {saving && <LoadingSpinner isOverlay={true} />}

      {!loading && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit movie" : "Add new movie"}
          </h1>

          <PhotoUploader
            ref={posterRef}
            label="Movie poster"
            posterUrl={defaultValues["cardImgUrl"]}
          />

          <div className="pt-5">
            <CategoryChooser
              allCategories={allCategoriesRef.current}
              activeCategories={activeCategories}
              setActiveCategories={setActiveCategories}
            />
            <p className="text-red-500 text-sm h-4 mt-2 text-center">
              {categoryError || " "}
            </p>
          </div>

          <ValidatedInput
            name="movieTitle"
            label="Movie title"
            type="text"
            validateFn={isNotEmpty}
            value={defaultValues["movieTitle"] || ""}
            ref={(el) => {
              if (el) refs.current["movieTitle"] = el;
            }}
          />

          <ValidatedInput
            name="movieYearOfRelese"
            label="Release year"
            type="number"
            validateFn={isNumberInRange(1895, currentYear)}
            value={defaultValues["movieYearOfRelese"] || ""}
            ref={(el) => {
              if (el) refs.current["movieYearOfRelese"] = el;
            }}
          />

          <ValidatedInput
            name="LengthOfMovieInMinutes"
            label="Length (minutes)"
            type="number"
            validateFn={isNumberInRange(1, 1000)}
            value={defaultValues["LengthOfMovieInMinutes"] || ""}
            ref={(el) => {
              if (el) refs.current["LengthOfMovieInMinutes"] = el;
            }}
          />

          <ValidatedInput
            name="director"
            label="Director"
            type="text"
            validateFn={isNotEmpty}
            value={defaultValues["director"] || ""}
            ref={(el) => {
              if (el) refs.current["director"] = el;
            }}
          />

          <ValidatedInput
            name="buyingPrice"
            label="Purchase price"
            type="number"
            validateFn={isNumberInRange(0, 1000)}
            value={defaultValues["buyingPrice"] || ""}
            ref={(el) => {
              if (el) refs.current["buyingPrice"] = el;
            }}
          />

          <ValidatedInput
            name="rentalPrice"
            label="Rental price"
            type="number"
            validateFn={isNumberInRange(0, 1000)}
            value={defaultValues["rentalPrice"] || ""}
            ref={(el) => {
              if (el) refs.current["rentalPrice"] = el;
            }}
          />

          <ValidatedTextarea
            name="description"
            label="Description"
            value={defaultValues["description"] || ""}
            validateFn={isNotEmpty}
            ref={(el) => {
              if (el) refs.current["description"] = el;
            }}
          />

          <div className="w-full pb-3 flex justify-center">
            <button
              type="submit"
              className="w-full mt-10 lg:w-1/2 mb-4 py-2 rounded-md bg-secondary-gradient transition-colors duration-200"
            >
              Save changes
            </button>
          </div>

          <p
            className={`text-sm text-center h-4 transition-colors duration-200 ${
              globalError.includes("saved")
                ? "text-green-500"
                : globalError
                ? "text-red-500"
                : "text-transparent"
            }`}
          >
            {globalError || " "}
          </p>
        </form>
      )}
    </div>
  );
};

export default UpsertMovie;
