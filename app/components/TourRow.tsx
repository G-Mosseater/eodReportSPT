import { useEffect, useState } from "react";
import { TourRowProps } from "../types/tourRow";
import { X } from "lucide-react";
import { tourLabels } from "../types/tourOrder";

export const TourRow = ({
  rowId,
  tourName,
  boatOptions,
  departureTimes,
  onChange,
  onRemove,
  initialData = {},
}: TourRowProps) => {
  const [hour, setHour] = useState(initialData.hour || "");
  const [boat, setBoat] = useState(initialData.boat || "");
  const [total, setTotal] = useState(initialData.total || 0);

  // const [adults, setAdults] = useState(initialData.adults || 0);
  const [groups, setGroups] = useState(initialData.groups || 0);
  const [youth, setYouth] = useState(initialData.youth || 0);
  const [child, setChild] = useState(initialData.child || 0);
  const [endurkoma, setEndurkoma] = useState(initialData.endurkoma || 0);
  const [free, setFree] = useState(initialData.free || 0);
  const [status, setStatus] = useState(initialData.status || "On");

  // const total = adults + groups + youth + child + endurkoma + free;

  let adults = Math.max(0, total - groups - youth - child - endurkoma - free);

  useEffect(() => {
    onChange(rowId, {
      tourName,
      hour,
      boat,
      adults,
      groups,
      youth,
      child,
      endurkoma,
      free,
      total,
      status,
    });
  }, [
    hour,
    boat,
    adults,
    groups,
    youth,
    child,
    endurkoma,
    free,
    status,
    total,
  ]);

  return (
    <div
      className={`
    relative flex flex-col gap-3 p-3 pt-8 border rounded w-full 
    lg:flex-row lg:gap-6 lg:p-2 lg:items-center
    transition-opacity
    ${status === "Canceled" ? "opacity-50 bg-gray-100" : "bg-white"}
  `}
    >
      <button
        type="button"
        onClick={() => onRemove(rowId)}
        className="absolute top-2 right-2 bg-red-600  hover:bg-red-700 text-white p-2  rounded-sm  shadow-md transition"
      >
        <X className="w-4 h-4 " />
      </button>
      <div className="flex flex-col gap-2 lg:gap-3 lg:min-w-[180px]">
        <div>
          <p className="font-semibold  text-base lg:text-lg">
            {tourLabels[tourName]}
          </p>
        </div>

        <select
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          className="border rounded px-2 py-1.5 text-sm lg:text-base lg:px-3 lg:py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          required={status !== "Canceled"}
          disabled={status === "Canceled"}
        >
          <option value="">Select time</option>
          {departureTimes.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          value={boat}
          onChange={(e) => setBoat(e.target.value)}
          className="border rounded px-2 py-1.5 text-sm lg:text-base lg:px-3 lg:py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          required={status !== "Canceled"}
          disabled={status === "Canceled"}
        >
          <option value="">Select boat</option>
          {boatOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 lg:gap-4">
        <div className="flex flex-col items-center">
          <label className="text-xs lg:text-sm mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-2 py-1.5 w-full text-sm lg:text-base lg:px-3 lg:py-2 lg:w-28 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="On">On</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        {(
          [
            ["Total", total, setTotal],
            ["Groups", groups, setGroups],
            ["Youth 7-15", youth, setYouth],
            ["Child 0-6", child, setChild],
            ["Endurkoma", endurkoma, setEndurkoma],
            ["Free", free, setFree],
          ] as [string, number, React.Dispatch<React.SetStateAction<number>>][]
        ).map(([label, value, setter]) => (
          <div key={label} className="flex flex-col items-center">
            <label className="text-xs lg:text-sm mb-1 whitespace-nowrap">
              {label}
            </label>
            <input
              type="number"
              min={0}
              value={value}
              onChange={(e) => setter(Number(e.target.value))}
              className="border rounded px-2 py-1.5 w-full text-sm lg:text-base lg:px-3 lg:py-2 lg:w-20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={status === "Canceled"}
            />
          </div>
        ))}

        <div className="flex flex-col items-center">
          <label className="text-xs lg:text-sm mb-1">Adults</label>
          <input
            readOnly
            type="number"
            value={adults}
            className="border rounded px-2 py-1.5 w-full text-sm lg:text-base lg:px-3 lg:py-2 lg:w-20 bg-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
};
