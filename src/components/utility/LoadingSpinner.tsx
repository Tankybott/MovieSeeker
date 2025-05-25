import { ClipLoader } from "react-spinners";

const LoadingSpinner: React.FC<{
  isOverlay?: boolean;
}> = ({ isOverlay = true }) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center z-50 ${
        isOverlay ? "bg-black/40 backdrop-blur-sm" : "bg-black"
      }`}
    >
      <ClipLoader color="#7308B0" size={64} />
    </div>
  );
};

export default LoadingSpinner;
