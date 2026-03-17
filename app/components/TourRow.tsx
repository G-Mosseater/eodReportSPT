import { useEffect, useState } from "react";

interface TourRowProps {
  rowId: string;
  tourName: string;
  boatOptions: string[];
  departureTimes: string[];
  onChange: (rowId: string, data: any) => void;
  onRemove: (rowId: string) => void;
}

export const TourRow = ({
  rowId,
  tourName,
  boatOptions,
  departureTimes,
  onChange,
  onRemove,
}: TourRowProps) => {
  const [hour, setHour] = useState("");
  const [boat, setBoat] = useState("");
  const [adults, setAdults] = useState(0);
  const [groups, setGroups] = useState(0);
  const [youth, setYouth] = useState(0);
  const [child, setChild] = useState(0);
  const [endurkoma, setEndurkoma] = useState(0);
  const [free, setFree] = useState(0);

  const total = adults + groups + youth + child + endurkoma + free;

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
    });
  }, [hour, boat, adults, groups, youth, child, endurkoma, free]);

  return (
    <div className="flex gap-4 p-2 border rounded w-max min-w-[400px]">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{tourName}</p>

   
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="border rounded px-2 py-1"
            required
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
          className="border rounded px-2 py-1"
          required
        >
          <option value="">Select boat</option>
          {boatOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {(
          [
            ["Adults", adults, setAdults],
            ["Groups", groups, setGroups],
            ["Youth 7-15", youth, setYouth],
            ["Child 0-6", child, setChild],
            ["Endurkoma", endurkoma, setEndurkoma],
            ["Free", free, setFree],
          ] as [string, number, React.Dispatch<React.SetStateAction<number>>][]
        ).map(([label, value, setter]) => (
          <div key={label} className="flex flex-col items-center">
            <label className="text-sm">{label}</label>
            <input
              type="number"
              min={0}
              value={value}
              onChange={(e) => setter(Number(e.target.value))}
              className="border rounded px-2 py-1 w-20"
            />
          </div>
        ))}

        <div className="flex flex-col items-center">
          <label className="text-sm">Total</label>
          <input
            type="number"
            readOnly
            value={total}
            className="border rounded px-2 py-1 w-20 bg-gray-100"
          />
        </div>
      </div>
      <div className="flex justify-between items-start">
        <button
          type="button"
          onClick={() => onRemove(rowId)}
          className="bg-red-500 hover:bg-red-600 text-white px-1  rounded transition-colors"
        >
          X
        </button>
      </div>
    </div>
  );
};
