import PrivateTourForm from "../../components/UI/PrivateForm";
import { privateTours } from "../../helpers/privateTours";
import Image from "next/image";
import { tourOptions, TourKey } from "../../helpers/tours";

type Props = {
  params: { slug: string };
};

export async function TourPage({ params }: Props) {
  const { slug } = await params;
  const tour = privateTours.find((t) => t.slug === slug);

  const boats = tourOptions[tour?.slug as TourKey].boats || [];

  if (!tour) {
    return <div className="p-8 text-center">Tour not found</div>;
  }

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gray-50 flex flex-col items-center">
      <div className="relative w-full max-w-4xl h-80 md:h-96 rounded-xl shadow-lg overflow-hidden mb-8">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105 rounded-xl"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-gray-900">
        {tour.name}
      </h1>

      <p className="text-lg md:text-xl text-gray-700 mb-8 text-left max-w-3xl leading-relaxed whitespace-pre-line">
        {" "}
        {tour.fullDescription}
      </p>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
          What's included
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-left max-w-xl mx-auto">
          {tour.whatsIncluded?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <PrivateTourForm tourName={tour.name} boatOptions={boats} />
    </div>
  );
}

export default TourPage;
