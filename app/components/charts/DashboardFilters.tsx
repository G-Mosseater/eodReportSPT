import { getMonths } from "../../helpers/dateFilters";
import { tourOptions, TourKey } from "../../helpers/tours";
import { tourLabels } from "../../types/tourOrder";

export default function DashboardFilters({
  month,
  year,
  tour,
  setMonth,
  setYear,
  setTour,
}: any) {
  const months = getMonths();
  return (
    <div className="flex gap-4 items-center">
      <select
        className="border p-2 rounded"
        value={tour}
        onChange={(e) => setTour(e.target.value)}
      >
        {Object.keys(tourOptions).map((key) => (
          <option key={key} value={key}>
            {tourLabels[key as TourKey]}
          </option>
        ))}
      </select>
      <div className="flex gap-4 items-center">
        <select
          className="border p-2 rounded"
          value={month}
          onChange={(e) =>
            setMonth(e.target.value === "" ? "" : Number(e.target.value))
          }
        >
          <option value="">All months</option>

          {months.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="border p-2 rounded w-24"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
