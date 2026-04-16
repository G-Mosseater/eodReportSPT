"use client";

import { useState } from "react";
import Image from "next/image";

export type Boat = {
  name: string;
  image: string;
  description: string;
};

export default function BoatTabs({ boats }: { boats: Boat[] }) {
  const [activeBoat, setActiveBoat] = useState(boats[0] || null);

  return (
    <div className="w-full max-w-3xl mb-8">
      <div className="flex gap-2 border-b mb-4">
        {boats.map((boat) => (
          <button
            key={boat.name}
            onClick={() => setActiveBoat(boat)}
            className={`border rounded px-2 py-1.5 w-full text-sm lg:text-base lg:px-3 lg:py-2 lg:w-20 focus:outline-none focus:ring-1
    ${
      activeBoat?.name === boat.name
        ? "bg-primary text-white border-primary"
        : "border-gray-300 hover:border-primary"
    }`}
          >
            {boat.name}
          </button>
        ))}
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md w-[500px] h-[300px]">
            <Image
              src={activeBoat.image}
              alt={activeBoat.name}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-center max-w-md mx-auto">
          <p className="text-gray-700 text-left">{activeBoat.description}</p>
        </div>
      </div>
    </div>
  );
}
