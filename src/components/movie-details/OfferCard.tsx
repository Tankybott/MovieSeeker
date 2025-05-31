import React from "react";

const OfferCard: React.FC<{
  title: string;
  description: string;
  onChoose?: () => void;
}> = ({ title, description, onChoose }) => {
  return (
    <div className="w-full h-[100%] flex flex-col border border-primary shadow-highlight-glow rounded-2xl text-white p-6 bg-secondary-gradient">
      <h3 className="text-2xl font-bold uppercase mb-6 text-center">{title}</h3>

      <button
        onClick={onChoose}
        className="bg-white text-black px-6   py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
      >
        Wybierz
      </button>

      <p className="text-sm mt-6 text-center leading-relaxed">{description}</p>
    </div>
  );
};

export default OfferCard;
