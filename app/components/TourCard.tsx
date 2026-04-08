"use client";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export default function Card({ title, description, image, href }: CardProps) {
  return (
    <div className="bg-neutral-primary-soft block max-w-sm p-6 border rounded-lg p-6 bg-white shadow hover:shadow-lg transition rounded-base shadow-xs">
      <Link href={href}>
        <Image
          className="rounded-sm w-full object-cover"
          src={image}
          alt={title}
          width={400}
          height={250}
        />
      </Link>

      <Link href={href}>
        <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">
          {title}
        </h5>
      </Link>

      <p className="mb-6 text-body">{description}</p>

      <Link
        href={href}
        className="inline-flex items-center text-body border focus:border-blue-500  shadow-xs font-medium leading-5 rounded-sm text-sm px-4 py-2.5 focus:outline-none"
      >
        Read more
        <svg
          className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
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
      </Link>
    </div>
  );
}
