import { useState } from "react";

const ExploreFilterDropdown: React.FC<{
  value: string;
  setValue: (val: string) => void;
  options: string[];
}> = ({ value, setValue, options }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    setValue(option);
    setOpen(false);
  };

  return (
    <div className="w-full relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center bg-zinc-900 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700"
      >
        {value}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 top-full mt-2 w-full bg-zinc-800 text-white rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-4 py-2 hover:bg-zinc-700"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreFilterDropdown;
