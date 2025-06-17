import LinkButton from "../utility/LinkButton";

export default function HeroHeader() {
  return (
    <div className="w-full h-auto lg:h-full mt-[25%] sm:mt-[15%]  lg:mt-0 flex flex-col lg:justify-center gap-5 sm:gap-1 lg:gap-5 p-5 xl:p-3">
      <h1 className="font-bold flex flex-col gap-0 ">
        <span className="font-bebas text-4xl  md:text-[50px] lg:text-[35px] 2xl:text-[64px] uppercase text-white leading-0 ">
          Movie Nights
        </span>{" "}
        <span className="font-bebas text-[50px] md:text-[70px] lg:text-[50px] 2xl:text-[98px] uppercase bg-main-gradient bg-clip-text text-transparent leading-[60px] sm:leading-[75px] md:leading-[130px] lg:leading-[79px] 2xl:leading-[130px]  whitespace-nowrap">
          Start right here
        </span>
      </h1>
      <p className="text-[#CECECE] text-sm lg:text-lg md:text-md max-w-auto lg:max-w-[60ch] mb-2">
        Rent movies you’ll love — fast, easy, and without leaving your home.
        Movie Seeker is your personal cinema, always within reach. Discover new
        releases, timeless classics, and hidden gems — all in one place, just a
        click away.
      </p>
      <div className="w-1/3 hidden lg:block ">
        <LinkButton text="Explore" to="/explore" />
      </div>
    </div>
  );
}
