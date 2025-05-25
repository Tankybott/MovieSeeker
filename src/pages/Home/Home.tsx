import HeroSection from "../../components/hero/HeroSection";
import HomeCarouselSection from "../../components/home-carousel/HomeCarouselSection";

const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-[3rem] overflow-hidden">
      <HeroSection />
      <HomeCarouselSection />
    </div>
  );
};

export default Home;
