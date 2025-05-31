import React, { useState } from "react";
import { Modal } from "../utility/Modal";
import RatingFetcher from "./RatingFetcher";

interface MovieRatePanelProps {
  rating: number;
  isAllowedToRate: boolean;
}

const MovieRatePanel: React.FC<MovieRatePanelProps> = ({
  rating,
  isAllowedToRate,
}) => {
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  return (
    <div className="flex items-center w-full gap-4">
      <p className="text-white text-3xl font-semibold">
        Ocena:{" "}
        <span className="font-bold uppercase bg-secondary-gradient bg-clip-text text-transparent">
          {rating.toFixed(1)}
        </span>
      </p>

      {isAllowedToRate && (
        <>
          <button
            onClick={() => setIsRatingOpen(true)}
            className="text-xs px-3 py-1 border border-primary text-white rounded-md hover:bg-primary/10 transition-all h-full"
          >
            Oceń film
          </button>

          {isRatingOpen && (
            <Modal onClose={() => setIsRatingOpen(false)}>
              <RatingFetcher />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default MovieRatePanel;
