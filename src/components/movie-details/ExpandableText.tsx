import React, { useState } from "react";

const ExpandableText: React.FC<{ text: string; limit?: number }> = ({
  text,
  limit = 150,
}) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > limit;
  const displayText = expanded || !isLong ? text : `${text.slice(0, limit)}...`;

  return (
    <div className="text-[16px] 3xl:text-[20px] text-gray-200 font-medium">
      {displayText}
      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="ml-2 text:[16px] 3xl:text-[18px] font-semibold bg-secondary-gradient bg-clip-text text-transparent hover:underline"
        >
          {expanded ? "Zwiń..." : "Rozwiń..."}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
