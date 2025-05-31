import React from "react";
import OfferCard from "./OfferCard";

const OfferCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 lg:p-[3rem]">
      <OfferCard
        title="Wypożycz"
        description="Wypożycz film na 48 godzin i oglądaj bez ograniczeń."
      />
      <OfferCard
        title="Kup"
        description="Kup dostęp do filmu na zawsze i oglądaj kiedy tylko chcesz. Idealna opcja dla fanów, którzy chcą mieć ulubione produkcje zawsze pod ręką."
      />
      <OfferCard
        title="Subskrybuj Platformę"
        description="Uzyskaj dostęp do całej biblioteki filmów dzięki miesięcznej subskrypcji."
      />
    </div>
  );
};

export default OfferCards;
