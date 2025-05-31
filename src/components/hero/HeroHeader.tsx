import LinkButton from "../utility/LinkButton";

export default function HeroHeader() {
  return (
    <div className="w-full h-auto lg:h-full mt-[25%] sm:mt-[15%]  lg:mt-0 flex flex-col lg:justify-center gap-5 sm:gap-1 lg:gap-5 p-5 xl:p-3">
      <h1 className="font-bold flex flex-col gap-0 ">
        <span className="font-bebas text-2xl sm:text-4xl md:text-[50px] lg:text-[35px] 2xl:text-[60px] uppercase text-white leading-0 ">
          Filmowe wieczory
        </span>{" "}
        <span className="font-bebas text-4xl sm:text-[50px] md:text-[70px] lg:text-[50px] 2xl:text-[90px] uppercase bg-main-gradient bg-clip-text text-transparent leading-[60px] sm:leading-[75px] md:leading-[130px] lg:leading-[79px] 2xl:leading-[130px]  whitespace-nowrap">
          Zaczynają się tutaj
        </span>
      </h1>
      <p className="text-[#CECECE] text-sm lg:text-lg md:text-md max-w-auto lg:max-w-[60ch] mb-2">
        Wypożyczaj filmy które pokochasz — szybko, wygodnie i bez wychodzenia z
        domu. Movie Seeker to Twoje osobiste kino, zawsze pod ręką. Odkrywaj
        nowości, klasyki i ukryte perełki, wszystko w jednym miejscu, gotowe na
        jedno kliknięcie.
      </p>
      <div className="w-1/3 hidden lg:block ">
        <LinkButton text="Eksploruj" to="/explore" />
      </div>
    </div>
  );
}
