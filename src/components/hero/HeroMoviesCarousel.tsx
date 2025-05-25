import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroMoviesCarouselCard from "./HeroMoviesCarouselCard";

interface HeroCardConfig {
  name: string;
  cardPhotoUrl: string;
  cardLink: string;
}

const heroCards: HeroCardConfig[] = [
  {
    name: "movie1",
    cardPhotoUrl: "/m1.webp",
    cardLink: "/some-route-1",
  },
  {
    name: "movie2",
    cardPhotoUrl: "/m2.webp",
    cardLink: "/some-route-2",
  },
  {
    name: "movie3",
    cardPhotoUrl: "/m3.webp",
    cardLink: "/some-route-3",
  },
];

const HeroMoviesCarousel: React.FC = () => {
  const [activeCardName, setActiveCardName] = useState(heroCards[0].name);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardName((prev) => {
        const currentIndex = heroCards.findIndex((card) => card.name === prev);
        const nextIndex = (currentIndex + 1) % heroCards.length;
        return heroCards[nextIndex].name;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const activeCard = heroCards.find((card) => card.name === activeCardName);

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
