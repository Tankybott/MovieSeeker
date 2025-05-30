import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

const CarouselTitle: React.FC<{ icon: ReactNode; title: string }> = ({
  icon,
  title,
}) => {
  return (
    <div className="w-full flex items-center h-full">
      <div className="p-4 flex gap-2 md:gap-3 h-full items-center ">
        {icon}
        <h3 className="font-bold text-md md:text-2xl text-white">{title}</h3>
      </div>
      <div className="w-full h-[3px] md:h-[6px] bg-main-gradient flex justify-center items-center rounded-4xl opacity-[20%] brightness-200 "></div>
      <Link
        className="text-sm md:text-[16px] font-semibold text-white whitespace-nowrap p-4"
        to="/"
      >
        Sprawdź więcej
      </Link>
    </div>
  );
};

export default CarouselTitle;
