import { motion } from "framer-motion";

const CategoryTag: React.FC<{
  label: string;
  isColored?: boolean;
  isDeletable?: boolean;
  onClick?: ((label: string) => void) | (() => void);
  disabled?: boolean;
}> = ({ label, isColored = false, isDeletable = false, onClick, disabled }) => {
  const handleClick = () => {
    if (!onClick || disabled) return;
    if (onClick.length === 0) {
      (onClick as () => void)();
    } else {
      (onClick as (label: string) => void)(label);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={`flex items-center px-4 py-1.5 rounded-full text-sm transition-colors
          ${
            isColored
              ? "bg-secondary-gradient text-white"
              : "bg-zinc-800 text-white hover:bg-zinc-700"
          }
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : onClick
              ? "cursor-pointer"
              : "cursor-default"
          }
        `}
      >
        <span>{label}</span>
        {isDeletable && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2 text-white opacity-70 hover:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
    </motion.div>
  );
};

export default CategoryTag;
