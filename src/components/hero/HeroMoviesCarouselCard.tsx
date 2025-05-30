import React from "react";
import { motion } from "framer-motion";
import PlayIcon from "../utility/PlayIcon";

//TODO FIX ALT

const HeroMoviesCarouselCard: React.FC<{
  cardPhotoUrl: string;
  cardLink: string;
}> = ({ cardPhotoUrl }) => {
  return (
    <motion.div
      key={cardPhotoUrl}
      className="relative w-full h-full cursor-pointer`"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Left tile */}
      <div className="absolute left-0 bottom-0 h-[97%] lg:h-[80%] 2xl:h-[97%] aspect-[2/3] z-20 rounded-xl overflow-hidden drop-shadow-[0_0_10px_rgba(196,13,96,0.2)]">
        <img
          src={cardPhotoUrl}
          alt="Zoomed Poster"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <PlayIcon />
      </div>

      {/* Right tile */}
      <div className="absolute right-0 top-0 h-[90%] lg:h-[75%] 2xl:h-[88%] aspect-[2/3] z-10 shadow-md overflow-hidden rounded-xl drop-shadow-[0_0_10px_rgba(196,13,96,0.1)]">
        <img
          src={cardPhotoUrl}
          alt="Main Poster"
          className="w-full h-full object-cover origin-top scale-150"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default HeroMoviesCarouselCard;
