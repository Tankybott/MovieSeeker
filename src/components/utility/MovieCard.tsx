import React from "react";
import RedDot from "./RedDot";

const MovieCard: React.FC<{
  cardImgUrl: string;
  movieTitle: string;
  movieYearOfRelese: number;
  lengthOfMovieInMinutes: number;
  setImageLoaded: () => void;
  redirectUrl: string;
}> = ({
  cardImgUrl,
  movieTitle,
  movieYearOfRelese,
  lengthOfMovieInMinutes,
  setImageLoaded,
  redirectUrl,
}) => {
  const handleClick = () => {
    window.location.href = redirectUrl;
  };

  return (
    <div
      onClick={handleClick}
      className="w-full box-border h-max flex flex-col gap-3 p-3 px-3 cursor-pointer"
    >
      <img
        className="aspect-[2/3] w-full"
        src={`${import.meta.env.BASE_URL}${cardImgUrl}`}
        alt={`${movieTitle} poster`}
        onLoad={setImageLoaded}
        loading="eager"
        onError={() => {
          console.error("Image failed:", cardImgUrl);
          setImageLoaded();
        }}
      />
      <h5 className="max-w-[100%] w-full text-md md:text-lg text-white truncate">
        {movieTitle}
      </h5>
      <div className="text-[#F8F8F8] text-sm md:text-md flex gap-4">
        <p>{movieYearOfRelese}</p>
        <div className="flex items-center gap-1">
          <RedDot />
          <p>{lengthOfMovieInMinutes}m</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
