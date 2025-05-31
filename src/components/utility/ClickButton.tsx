import React from "react";

const ClickButton: React.FC<{
  text: string;
  onClick: () => void;
  isColoredInside?: boolean;
}> = ({ text, onClick, isColoredInside = false }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 px-3 w-full cursor-pointer rounded-lg border border-primary hover:shadow-highlight-glow transition-shadow duration-250 ease-in-out text-white ${
        isColoredInside ? "bg-primary-transparent" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default ClickButton;
