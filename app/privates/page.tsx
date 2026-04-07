"use client";
import Link from "next/link";

export default function PrivateTours() {
  const tours = [
    {
      id: 1,
      name: "Whale Watching",
      description: "Experience majestic whales up close on a guided tour.",
    },
    {
      id: 2,
      name: "Northern Lights",
      description: "Chase the aurora borealis in Iceland’s darkest skies.",
    },
    {
      id: 3,
      name: "Whale Watching by RIB",
      description: "Fast and thrilling RIB boat adventure for whale spotting.",
    },
    {
      id: 4,
      name: "Puffin Tours",
      description: "See puffins in their natural habitat during summer months.",
    },
    {
      id: 5,
      name: "Sea Angling",
      description: "Enjoy a fishing adventure on Icelandic waters.",
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Private Tours</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="border rounded-lg p-6 bg-white shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{tour.name}</h2>
            <p className="text-gray-700 mb-4">{tour.description}</p>
            <Link
              href={`/privates`}
              className="text-blue-600 hover:underline"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}