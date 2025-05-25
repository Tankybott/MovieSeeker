import { useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryTag from "./CategoryTag";

const ExploreCategoryChooserPopup: React.FC<{
  allCategories: string[];
  activeCategories: string[];
  setActiveCategories: (val: string[]) => void;
  onClose: () => void;
}> = ({ allCategories, activeCategories, setActiveCategories, onClose }) => {
  const [delayedEmpty, setDelayedEmpty] = useState(false);

  const inactiveCategories = useMemo(
    () => allCategories.filter((cat) => !activeCategories.includes(cat)),
    [allCategories, activeCategories]
  );

  useEffect(() => {
    if (activeCategories.length === 0) {
      const timeout = setTimeout(() => setDelayedEmpty(true), 200);
      return () => clearTimeout(timeout);
    } else {
      setDelayedEmpty(false);
    }
  }, [activeCategories]);

  const addCategory = (label: string) => {
    setActiveCategories([...activeCategories, label]);
  };

  const removeCategory = (label: string) => {
    setActiveCategories(activeCategories.filter((cat) => cat !== label));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.2 }}
      className="w-full mt-4 p-4 rounded-md bg-zinc-900 text-white shadow-lg border border-zinc-700"
    >
      {/* Active Categories */}
      <div className="mb-4">
        <h3 className="text-sm mb-2 text-gray-400">Wybrane kategorie</h3>
        <div className="flex flex-wrap gap-2 min-h-[28px]">
          <AnimatePresence>
            {activeCategories.map((category) => (
              <CategoryTag
                key={category}
                label={category}
                isColored={true}
                isDeletable={true}
                onClick={removeCategory}
              />
            ))}

            {delayedEmpty && (
              <motion.p
                key="no-selected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-500 text-sm"
              >
                Brak wybranych kategorii
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <hr className="border-zinc-700 my-4" />

      {/* Inactive Categories */}
      <div>
        <h3 className="text-sm mb-2 text-gray-400">Dostępne kategorie</h3>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {inactiveCategories.map((category) => (
              <CategoryTag
                key={category}
                label={category}
                isColored={false}
                isDeletable={false}
                onClick={() => addCategory(category)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm"
        >
          Zamknij
        </button>
      </div>
    </motion.div>
  );
};

export default ExploreCategoryChooserPopup;
