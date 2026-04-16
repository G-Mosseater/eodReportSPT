"use client";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  tour: {
    id: number;
    name: string;
    description: string;
    image: string;
    slug: string;
  };
};

export default function Card({ tour }: CardProps) {
  return (
    <div className="bg-white shadow hover:shadow-xl  hover:-translate-y-1 transition-transform duration-200 rounded-lg border max-w-sm p-6 flex flex-col h-full">
      <Link href={`/privates/${tour.slug}`}>
        <Image
          className="rounded-sm w-full object-cover"
          src={tour.image}
          alt={tour.name}
          width={400}
          height={250}
        />
      </Link>
      <Link href={`/privates/${tour.slug}`}>
        <h5 className="text-2xl font-semibold  mt-2">{tour.name}</h5>
      </Link>
      <p className="mt-2 mb-4">{tour.description}</p>
      <Link href={`/privates/${tour.slug}`} className="mt-auto block">
        <button className=" inline-flex items-center gap-2 text-body font-medium text-sm px-4 py-2.5 border border-primary rounded-sm shadow-xs transition-colors duration-200 ease-in-out hover:bg-primary hover:text-white w-full justify-center">
          Read more
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}
