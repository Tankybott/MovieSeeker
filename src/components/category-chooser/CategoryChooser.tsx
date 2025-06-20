import { Dispatch, SetStateAction, useState } from "react";
import CategoryTag from "../utility/CategoryTag";
import ExploreCategoryChooserPopup from "./CategoryChooserPopup";
import { AnimatePresence } from "framer-motion";

const CategoryChooser: React.FC<{
  allCategories: string[];
  activeCategories: string[];
  setActiveCategories: Dispatch<SetStateAction<string[]>>;
  disabled?: boolean;
}> = ({ allCategories, activeCategories, setActiveCategories, disabled }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen((prev) => !prev);
  const closePopup = () => setIsPopupOpen(false);

  const removeCategory = (label: string) => {
    setActiveCategories((prev) => prev.filter((cat) => cat !== label));
  };

  return (
    <div className="w-full">
      {/* Tags row */}
      <div className="flex flex-wrap gap-2">
        <CategoryTag
          label="Select Categories"
          isColored={true}
          isDeletable={false}
          onClick={togglePopup}
          disabled={disabled}
        />

        <AnimatePresence>
          {activeCategories.map((category) => (
            <CategoryTag
              key={category}
              label={category}
              isColored={false}
              isDeletable={true}
              onClick={removeCategory}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Popup with animation */}
      <AnimatePresence>
        {isPopupOpen && (
          <ExploreCategoryChooserPopup
            key="popup"
            allCategories={allCategories}
            activeCategories={activeCategories}
            setActiveCategories={setActiveCategories}
            onClose={closePopup}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryChooser;
