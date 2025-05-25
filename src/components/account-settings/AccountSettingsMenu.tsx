import React from "react";

const AccountsettingsMenu: React.FC<{
  items: string[];
  activeItem: string;
  setActiveTile: (item: string) => void;
}> = ({ items, activeItem, setActiveTile }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <ul className="flex flex-col w-full flex-grow">
        <h3 className="text-white text-2xl px-[2rem] mt-10 mb-10 font-semibold">
          Ustawienia
        </h3>
        {items.map((item) => {
          const isActive = item === activeItem;

          return (
            <li
              key={item}
              onClick={() => setActiveTile(item)}
              className={`relative cursor-pointer px-[2rem] py-3 text-white transition-all duration-200
                ${isActive ? "font-semibold" : "opacity-80 hover:opacity-100"}`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-primary-transparent-right-gradient opacity-40 rounded-r-md pointer-events-none" />
              )}

              <span className="relative z-10">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AccountsettingsMenu;
