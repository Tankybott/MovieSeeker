import React, { useEffect, useState } from "react";
import HeroSection from "../../components/hero/HeroSection";
import CarouselSection from "../../components/carousel/CarouselSection";
import { HeroCardConfig } from "../../components/hero/HeroMoviesCarousel";
import { CarouselCardConfig } from "../../components/carousel/Carousel";
import {
  fetchNewestMovies,
  fetchMostPopularMovies,
  fetchMoviesByIds,
  Movie,
} from "../../funcs/fetchMovies";
import LoadingSpinner from "../../components/utility/LoadingSpinner";

// 🔹 IDs for the hero section
const HERO_IDS = [
  "8c1da961-51df-4cb7-96ad-ab01911079e5", // The Bondsman
  "8eea0334-ddf5-4840-a073-a2b64a0a5e6e", // Shawshank
  "9eee9682-214c-4f49-b94f-c52b0241c673", // Blade Runner
];

let popularMovies: CarouselCardConfig[] = [];
let newestMovies: CarouselCardConfig[] = [];
let heroCards: HeroCardConfig[] = [];

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [popular, newest, hero] = await Promise.all([
        fetchMostPopularMovies(10),
        fetchNewestMovies(10),
        fetchMoviesByIds(HERO_IDS),
      ]);

      const toCardConfig = (movies: Movie[]): CarouselCardConfig[] =>
        movies.map((movie) => ({
          movieTitle: movie.movieTitle,
          movieYearOfRelese: movie.movieYearOfRelese,
          LengthOfMovieInMinutes: movie.LengthOfMovieInMinutes,
          cardImgUrl: movie.cardImgUrl,
        }));

      const toHeroCardConfig = (movies: Movie[]): HeroCardConfig[] =>
        movies.map((movie) => ({
          name: movie.movieTitle,
          cardPhotoUrl: movie.cardImgUrl,
          cardLink: `/movies/${movie.id}`, // using real route now
        }));

      popularMovies = toCardConfig(popular);
      newestMovies = toCardConfig(newest);
      heroCards = toHeroCardConfig(hero);

      setIsLoaded(true);
    };

    loadData();
  }, []);

  if (!isLoaded)
    return (
      <div className="relative w-full h-[80vh]">
        <LoadingSpinner isOverlay={false} />
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-[3rem] overflow-hidden">
      <HeroSection movies={heroCards} />
      <CarouselSection
        title="Popularne"
        flatIconClass="fi fi-sr-flame"
        carouselCardsConfig={popularMovies}
      />
      <CarouselSection
        title="Nowe"
        flatIconClass="fi fi-sr-star-christmas"
        carouselCardsConfig={newestMovies}
      />
    </div>
  );
};

export default Home;
