import { useEffect, useState } from "react";
import LoadingSpinner from "../utility/LoadingSpinner";

const SubscriptionSetting: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 1000);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[40vh] lg:min-h-0">
      {isActive === null && <LoadingSpinner isOverlay={false} />}

      {isActive !== null && (
        <div className="w-full h-full flex flex-col items-center p-6 py-12 text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Subskrypcja
          </h2>

          <p className="text-lg mb-6 text-center">
            {isActive
              ? "Twoja subskrypcja jest aktywna."
              : "Nie masz aktywnej subskrypcji."}
          </p>

          <a
            href="#"
            className="px-6 py-2 rounded-md bg-primary hover:bg-primary-dark transition-colors duration-200"
          >
            {isActive ? "Dezaktywuj subskrypcję" : "Aktywuj subskrypcję"}
          </a>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSetting;
