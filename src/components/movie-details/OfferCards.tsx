import React from "react";
import OfferCard from "./OfferCard";

const OfferCards: React.FC<{ buyPrice: number; rentPrice: number }> = ({
  buyPrice,
  rentPrice,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 lg:p-[3rem]">
      <OfferCard
        title="Rent"
        description="Rent a movie for 48 hours and watch without limits."
        price={rentPrice}
      />
      <OfferCard
        title="Buy"
        description="Buy permanent access to the movie and watch whenever you want. Ideal option for fans who want to keep their favorite productions always at hand."
        price={buyPrice}
      />
      <OfferCard
        title="Subscribe to the Platform"
        description="Get access to the entire movie library with a monthly subscription."
        price={59.99}
      />
    </div>
  );
};

export default OfferCards;
