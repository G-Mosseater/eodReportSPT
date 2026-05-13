import { GiWhaleTail } from "react-icons/gi";
import { MdCancel, MdOutlineSearchOff } from "react-icons/md";
import { IoBoatOutline } from "react-icons/io5";
import { TbWavesElectricity } from "react-icons/tb";

type Props = {
  totalSightings: number;
  totalCancelled: number;
  totalPrivate: number;
  breachingEvents: number;
  endurkoma: number;
};

export default function WhaleKpiBoxes({
  totalSightings,
  totalCancelled,
  totalPrivate,
  breachingEvents,
  endurkoma,
}: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Operational Overview</h2>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[160px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-gray-500">Total Sightings</p>

            <GiWhaleTail className="text-primary text-xl sm:text-2xl" />
          </div>
          <p className="text-lg md:text-2xl font-bold">
            {totalSightings.toLocaleString()}
          </p>
        </div>

        <div className="flex-1 min-w-[160px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-gray-500">Private Tours</p>

            <IoBoatOutline className="text-primary text-xl sm:text-2xl" />
          </div>
          <p className="text-lg md:text-2xl font-bold">
            {totalPrivate.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 min-w-[160px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-gray-500">Breaching Events</p>

            <TbWavesElectricity className="text-primary text-xl sm:text-2xl" />
          </div>
          <p className="text-lg md:text-2xl font-bold">
            {breachingEvents.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 min-w-[160px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-gray-500">Cancelled Tours</p>

            <MdCancel className="text-primary text-xl sm:text-2xl" />
          </div>
          <p className="text-lg md:text-2xl font-bold text-red-500">
            {totalCancelled.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 min-w-[160px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-gray-500">Endurkoma</p>
            <MdOutlineSearchOff className="text-primary text-xl sm:text-2xl" />{" "}
          </div>
          <p className="text-lg md:text-2xl font-bold text-red-500">
            {endurkoma.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
