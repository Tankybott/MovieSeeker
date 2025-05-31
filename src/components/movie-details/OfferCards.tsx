import React from "react";
import OfferCard from "./OfferCard";

const OfferCards: React.FC<{ buyPrice: number; rentPrice: number }> = ({
  buyPrice,
  rentPrice,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 lg:p-[3rem]">
      <OfferCard
        title="Wypożycz"
        description="Wypożycz film na 48 godzin i oglądaj bez ograniczeń."
        price={rentPrice}
      />
      <OfferCard
        title="Kup"
        description="Kup dostęp do filmu na zawsze i oglądaj kiedy tylko chcesz. Idealna opcja dla fanów, którzy chcą mieć ulubione produkcje zawsze pod ręką."
        price={buyPrice}
      />
      <OfferCard
        title="Subskrybuj Platformę"
        description="Uzyskaj dostęp do całej biblioteki filmów dzięki miesięcznej subskrypcji."
        price={59.99}
      />
    </div>
  );
};

export default OfferCards;
