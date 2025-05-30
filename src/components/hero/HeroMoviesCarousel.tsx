import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroMoviesCarouselCard from "./HeroMoviesCarouselCard";

export interface HeroCardConfig {
  name: string;
  cardPhotoUrl: string;
  cardLink: string;
}

const HeroMoviesCarousel: React.FC<{ movies: HeroCardConfig[] }> = ({
  movies,
}) => {
  const [activeCardName, setActiveCardName] = useState(movies[0]?.name ?? "");

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setActiveCardName((prev) => {
        const currentIndex = movies.findIndex((card) => card.name === prev);
        const nextIndex = (currentIndex + 1) % movies.length;
        return movies[nextIndex].name;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [movies]);

  const activeCard = movies.find((card) => card.name === activeCardName);

  return (
    <div className="relative w-full h-full p-5 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {activeCard && (
          <HeroMoviesCarouselCard
            key={activeCard.name}
            cardPhotoUrl={activeCard.cardPhotoUrl}
            cardLink={activeCard.cardLink}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroMoviesCarousel;
