import HomeCarousel, { CarouselCardConfig } from "./HomeCarousel";
import HomeCarouselTitle from "./HomeCarouselTitle";
const cardsConfig: CarouselCardConfig[] = [
  {
    movieTitle: "The Bondsman",
    movieYearOfRelese: 1993,
    LengthOfMovieInMinutes: 80,
    cardImgUrl: "/m1.webp",
  },
  {
    movieTitle: "The Shwanshank redemption",
    movieYearOfRelese: 2022,
    LengthOfMovieInMinutes: 122,
    cardImgUrl: "/m2.webp",
  },
  {
    movieTitle: "Blade Runner",
    movieYearOfRelese: 2001,
    LengthOfMovieInMinutes: 100,
    cardImgUrl: "/m3.webp",
  },
  {
    movieTitle: "Ash",
    movieYearOfRelese: 1993,
    LengthOfMovieInMinutes: 80,
    cardImgUrl: "/ash.webp",
  },
  {
    movieTitle: "Havoc",
    movieYearOfRelese: 2022,
    LengthOfMovieInMinutes: 122,
    cardImgUrl: "/havoc.webp",
  },
  {
    movieTitle: "You",
    movieYearOfRelese: 2001,
    LengthOfMovieInMinutes: 100,
    cardImgUrl: "/you.webp",
  },
  {
    movieTitle: "A working man",
    movieYearOfRelese: 1993,
    LengthOfMovieInMinutes: 80,
    cardImgUrl: "/workingman.webp",
  },
  {
    movieTitle: "The Accountant 2",
    movieYearOfRelese: 2022,
    LengthOfMovieInMinutes: 122,
    cardImgUrl: "/accountant.webp",
  },
  {
    movieTitle: "Andor",
    movieYearOfRelese: 2001,
    LengthOfMovieInMinutes: 100,
    cardImgUrl: "/andor.webp",
  },
];

const reversedCardConfig = [...cardsConfig].reverse();

export default function HomeCarouselSection() {
  return (
    <section>
      <div className="mb-[4rem]">
        <HomeCarouselTitle
          title="Popularne"
          icon={
            <i className="fi fi-sr-flame text-lg  md:text-[25px] text-primary leading-0 [text-shadow:0_0_3px_#7308B0]"></i>
          }
        />
        <HomeCarousel
          carouselCardsConfig={cardsConfig}
          numberOfCardsOnExtraLargeScreen={9}
          numberOfCardsOnLargeScreen={7}
          numberOfCardsOnMediumScreen={4}
          numberOfCardsOnSmallScreen={2}
        />
      </div>
      <div className="mb-[2rem]">
        <HomeCarouselTitle
          title="Nowe"
          icon={
            <i className="fi fi-sr-star-christmas text-lg md:text-[25px] text-[#7308B0] leading-0 [text-shadow:0_0_3px_#7308B0]"></i>
          }
        />
        <HomeCarousel
          carouselCardsConfig={reversedCardConfig}
          numberOfCardsOnExtraLargeScreen={9}
          numberOfCardsOnLargeScreen={7}
          numberOfCardsOnMediumScreen={4}
          numberOfCardsOnSmallScreen={2}
        />
      </div>
    </section>
  );
}
