export default function HoroMoviesCarouselBorder() {
  return (
    <>
      <div className="w-[90%] h-[1px] bg-main-gradient absolute bottom-0 left-0">
        <div className="absolute h-[6px] w-[6px] rounded-full bg-pinky right-0 bottom-[-3px]"></div>
      </div>
      <div className="w-[1px] h-[80%] bg-main-gradient-bottom absolute bottom-0 left-0">
        <div className="absolute h-[6px] w-[6px] rounded-full bg-pinky left-[-3px] top-0"></div>
      </div>
    </>
  );
}
