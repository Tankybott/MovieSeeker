import { ClipLoader } from "react-spinners";

const LoadingSpinner: React.FC<{
  isOverlay?: boolean;
  color?: string;
}> = ({ isOverlay = true, color = "black" }) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center z-40 ${
        isOverlay ? `bg-${color}/40 backdrop-blur-sm` : `bg-${color}`
      }`}
    >
      <ClipLoader color="#7308B0" size={64} />
    </div>
  );
};

export default LoadingSpinner;
