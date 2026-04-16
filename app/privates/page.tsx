import TourCard from "../components/TourCard";
import { privateTours } from "../helpers/privateTours";

export default function PrivateTours() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {privateTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
