import React, { useState } from "react";

const ActorList: React.FC<{ actors: string[] }> = ({ actors }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleActors = expanded ? actors : actors.slice(0, 3);

  return (
    <div className="w-full">
      <div className="block md:hidden border-t border-white/20 mb-3 pt-4">
        <h3 className="text-white text-lg font-semibold mb-2">Actors</h3>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {visibleActors.map((actor, index) => (
          <span
            key={index}
            className="text-white text-sm px-4 py-1 bg-zinc-800 rounded-full"
          >
            {actor}
          </span>
        ))}
        {actors.length > 3 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="ml-2 text-[16px] 3xl:text-[18px] font-semibold bg-secondary-gradient bg-clip-text text-transparent hover:underline"
          >
            {expanded ? "Show less..." : "Show more..."}
          </button>
        )}
      </div>
    </div>
  );
};

export default ActorList;
