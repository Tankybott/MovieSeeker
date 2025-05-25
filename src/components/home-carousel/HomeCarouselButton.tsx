import React, { ReactNode, useState } from "react";

const HomeCarouselButton: React.FC<{
  icon: ReactNode;
  onHold: () => void;
  onLeaveHold: () => void;
}> = ({ icon, onHold, onLeaveHold }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
    onHold();
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    onLeaveHold();
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
    onLeaveHold();
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`hidden lg:flex w-full h-full justify-center items-center cursor-pointer bg-main-gradient-bottom text-white text-2xl lg:text-sm 2xl:text-lg  rounded-lg opacity-[80%]
        transition-all duration-150
        ${isPressed ? "scale-95 brightness-90" : ""}
      `}
    >
      {icon}
    </button>
  );
};

export default HomeCarouselButton;
