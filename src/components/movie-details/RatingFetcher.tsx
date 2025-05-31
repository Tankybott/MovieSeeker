import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import LoadingSpinner from "../utility/LoadingSpinner";

const submitRating = async (value: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(value);
      const shouldFail = Math.random() < 0.2;
      if (shouldFail) {
        reject();
      } else {
        resolve();
      }
    }, 1000);
  });
};

const RatingFetcher = () => {
  const [value, setValue] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleRate = async (newValue: number) => {
    setValue(newValue);
    setLoading(true);
    setStatus(null);

    try {
      await submitRating(newValue);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setStatus(null);
      setValue(0);
      setLoading(false);
    };
  }, []);

  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center lg:w-[30vw] h-[25vh] lg:h-[18vh] bg-black text-white rounded-xl shadow-md p-6">
      {loading && <LoadingSpinner isOverlay />}

      {/* Heading */}
      <h3 className="text-xl font-semibold p-2">Oceń film</h3>

      <Rating
        style={{ maxWidth: 300 }}
        value={value}
        onChange={handleRate}
        items={10}
        halfFillMode="svg"
      />

      <div className="h-6 mt-2 flex items-center justify-center leading-5">
        {status === "success" && (
          <p className="text-sm text-green-500">Dodano ocenę!</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500">Coś poszło nie tak...</p>
        )}
      </div>
    </div>
  );
};

export default RatingFetcher;
