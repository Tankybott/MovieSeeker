import React from "react";
import HomeCarousel, { CarouselCardConfig } from "./Carousel";
import HomeCarouselTitle from "./CarouselTitle";

const CarouselSection: React.FC<{
  title: string;
  flatIconClass: string;
  carouselCardsConfig: CarouselCardConfig[];
}> = ({ title, flatIconClass, carouselCardsConfig }) => {
  return (
    <div>
      <HomeCarouselTitle
        title={title}
        icon={
          <i
            className={`${flatIconClass} text-lg md:text-[25px] text-primary leading-0 [text-shadow:0_0_3px_#7308B0]`}
          />
        }
      />
      <HomeCarousel
        carouselCardsConfig={carouselCardsConfig}
        numberOfCardsOnExtraLargeScreen={9}
        numberOfCardsOnLargeScreen={7}
        numberOfCardsOnMediumScreen={4}
        numberOfCardsOnSmallScreen={2}
      />
    </div>
  );
};

export default CarouselSection;