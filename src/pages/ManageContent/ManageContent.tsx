import React, { useState } from "react";
import ManageMovies from "../../components/manage-content/ManageMovies";
import ManageCategories from "../../components/manage-content/ManageCategories";

const ManageContentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"movies" | "categories">("movies");

  return (
    <div className="bg-black flex items-center justify-center lg:px-4 py-[6rem] lg:py-[3rem]">
      <div className="w-full max-w-6xl border border-gray-700 rounded-lg p-2 lg:p-6 bg-gray-900 space-y-6">
        {/* Top Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("movies")}
            className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors border
              ${
                activeTab === "movies"
                  ? "bg-main-gradient text-white border-primary shadow-highlight-glow"
                  : "border-gray-500 text-gray-300 hover:bg-gray-800"
              }`}
          >
            Filmy
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors border
              ${
                activeTab === "categories"
                  ? "bg-main-gradient text-white border-primary shadow-highlight-glow"
                  : "border-gray-500 text-gray-300 hover:bg-gray-800"
              }`}
          >
            Kategorie
          </button>
        </div>

        {/* Inner Content Area */}
        <div className="w-full border border-gray-700 rounded-md p-6 bg-gray-950">
          {activeTab === "movies" && <ManageMovies />}
          {activeTab === "categories" && <ManageCategories />}
        </div>
      </div>
    </div>
  );
};

export default ManageContentPage;
