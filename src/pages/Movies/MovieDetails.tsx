import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById, fetchMovies, Movie } from "../../funcs/fetchMovies";
import LoadingSpinner from "../../components/utility/LoadingSpinner";
import CategoryTag from "../../components/utility/CategoryTag";
import PlayIcon from "../../components/utility/PlayIcon";
import ActorList from "../../components/movie-details/ActorList";
import ClickButton from "../../components/utility/ClickButton";
import CarouselSection from "../../components/carousel/CarouselSection";
import { CarouselCardConfig } from "../../components/carousel/Carousel";
import MovieRatePanel from "../../components/movie-details/MovieRatePanel";
import ExpandableText from "../../components/movie-details/ExpandableText";
import { Modal } from "../../components/utility/Modal";
import OfferCards from "../../components/movie-details/OfferCards";

//TODO Movies suppose to carry info from which postion poster should be displayed top/bottom/center

// =======================================
// ❖ Dummy Helper (Simulates User Access)
// =======================================
const fetchUserHasMovie = async (): Promise<boolean> => {
  await new Promise((res) => setTimeout(res, 500));
  return true;
};

// ================================
// ❖ Main Component: MovieDetails
// ================================
const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // ========== ⤵ State & Refs
  const movieRef = useRef<Movie | undefined>(undefined);
  const relatedRef = useRef<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [userHasMovie, setUserHasMovie] = useState<boolean>(false);
  const [offerCardsOpen, setOfferCardsOpen] = useState(false);

  // ========== ⤵ Fetch Data on Mount
  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const movieData = await fetchMovieById(id);
        movieRef.current = movieData;

        if (!movieData) {
          setUserHasMovie(false);
          relatedRef.current = [];
          return;
        }

        const [hasMovie, relatedMovies] = await Promise.all([
          fetchUserHasMovie(),
          movieData.categories.length > 0
            ? fetchMovies(
                undefined,
                [movieData.categories[0]],
                undefined,
                0,
                10,
                movieData.id
              )
            : Promise.resolve([]),
        ]);

        setUserHasMovie(hasMovie);
        relatedRef.current = relatedMovies;
      } catch {
        // handle error silently
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // ========== ⤵ Map Related Movies to Carousel Cards
  const relatedCardsConfig = useMemo<CarouselCardConfig[]>(() => {
    return relatedRef.current.map((movie) => ({
      movieTitle: movie.movieTitle,
      movieYearOfRelese: movie.movieYearOfRelese,
      LengthOfMovieInMinutes: movie.LengthOfMovieInMinutes,
      cardImgUrl: movie.cardImgUrl,
      redirectUrl: "/movies/" + movie.id,
    }));
  }, [loading]);

  // ========== ⤵ Handle Loading / Not Found
  if (loading) {
    return (
      <div className="relative w-full h-[80vh] ">
        <LoadingSpinner isOverlay />
      </div>
    );
  }

  const movie = movieRef.current;
  if (!movie) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-white">
        Movie not found.
      </div>
    );
  }

  // ========== ⤵ Main Render
  return (
    <main className="w-full flex flex-col bg-black text-white mt-[4.5rem] lg:mt-0">
      {/* ========== 🎬 Movie Info Section */}
      <div className="w-full flex flex-col lg:flex-row lg:justify-around gap-5 lg:p-5">
        {/* Movie Poster */}
        <div className="w-full lg:w-[30%]">
          <div
            className={`lg:h-[78vh] w-auto p-4 relative gap-3 ${
              userHasMovie ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            <img
              src={`${import.meta.env.BASE_URL}${movie.cardImgUrl}`}
              alt={movie.movieTitle + " poster"}
              className="w-full h-full object-cover object-center rounded-md shadow-highlight-glow"
            />
            <PlayIcon />
          </div>
        </div>

        {/* Movie Content */}
        <div className="w-full lg:w-[60%] flex flex-col gap-5 p-2 lg:p-5">
          {/* Title */}
          <h4 className="font-bebas font-semibold uppercase bg-secondary-gradient bg-clip-text text-transparent text-[48px] lg:text-[70px] 3xl:text-[90px] lg:leading-none">
            {movie.movieTitle}
          </h4>

          {/* Categories */}
          <div className=" flex gap-2 flex-wrap">
            {movie.categories.map((c) => (
              <CategoryTag key={c} label={c} isColored />
            ))}
          </div>

          {/* Rating */}
          <div className="mt-4 lg:mt-2">
            <MovieRatePanel
              rating={movie.rating}
              isAllowedToRate={userHasMovie}
            />
          </div>

          {/* Description */}
          <div>
            <ExpandableText text={movie.description} limit={300} />
          </div>

          {/* Director */}
          <p className="text:[18px] lg:text-[18px] 3xl:text-[22px] text-gray-200 font-medium mt-2">
            Director: {movie.director}
          </p>

          {/* Actors */}
          <div className="mt-3">
            <ActorList actors={movie.actors} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-5 w-full mt-3">
            {userHasMovie ? (
              <>
                <div className="w-full sm:w-1/3">
                  <ClickButton
                    text="Watch"
                    isColoredInside
                    onClick={() => {}}
                  />
                </div>
                <div className="w-full sm:w-1/3">
                  <ClickButton
                    text="Watch trailer"
                    isColoredInside
                    onClick={() => {}}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="w-full sm:w-1/3">
                  <ClickButton
                    text="Kup dostęp"
                    isColoredInside
                    onClick={() => setOfferCardsOpen(true)}
                  />
                </div>
                <div className="w-full sm:w-1/3">
                  <ClickButton
                    text="Zobacz trailer"
                    isColoredInside
                    onClick={() => {}}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========== 🎞️ Related Movies Section */}
      {relatedRef.current.length > 0 && (
        <div className="mt-10">
          <CarouselSection
            title="Podobne"
            flatIconClass="fi fi-rr-apps"
            carouselCardsConfig={relatedCardsConfig}
          />
        </div>
      )}

      {/* ========== 💳 Modal with Offer Cards */}
      {offerCardsOpen && (
        <Modal onClose={() => setOfferCardsOpen(false)}>
          <OfferCards
            buyPrice={movie.buyingPrice}
            rentPrice={movie.rentalPrice}
          />
        </Modal>
      )}
    </main>
  );
};

export default MovieDetails;
