import TourCard from "../components/TourCard";
import { privateTours } from "../helpers/privateTours";

export default function PrivateTours() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto text-left mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Private Tours</h1>
        <p className="text-sm md:text-base text-gray-600">
          We offer a wide selection of private tours tailored to your needs.
          Whether you're looking for a unique wildlife experience, a special
          occasion, or a personalized adventure, our tours can be fully
          customized to create the perfect experience for you.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {privateTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
