import React from "react";
import { Link } from "react-router-dom";

const LinkButton: React.FC<{
  text: string;
  to: string;
  isColoredInside?: boolean;
}> = ({ text, to, isColoredInside = false }) => {
  return (
    <Link
      to={to}
      className={`p-2 px-5 w-full text-center cursor-pointer rounded-lg border border-primary hover:shadow-highlight-glow transition-shadow duration-250 ease-in-out text-white ${
        isColoredInside ? "bg-primary-transparent" : ""
      }`}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
