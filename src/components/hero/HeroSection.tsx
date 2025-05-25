import { useIsLandscape } from "../../custom-hooks/useIsLandscape";
import HeroHeader from "./HeroHeader";
import HeroMoviesCarousel from "./HeroMoviesCarousel";
import HoroMoviesCarouselBorder from "./HeroMoviesCarouselBorder";

const HeroSection: React.FC = () => {
  const isLandscape = useIsLandscape();
  return (
    <section className="w-full lg:h-[80vh] flex flex-col items-center lg:flex-row">
      <div className="w-full h-full lg:w-1/2">
        <HeroHeader />
      </div>
      <div
        className={`p-4  h-[50vh] sm:h-[80vh]  lg:h-full w-full sm:w-1/2 ${
          isLandscape ? "md:w-[1/2] md:h-[100vh]" : "md:w-full md:h-[60vh]"
        } lg:w-1/2`}
      >
        <div className="relative w-full h-full lg:p-5">
          <HeroMoviesCarousel />
          <HoroMoviesCarouselBorder />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
