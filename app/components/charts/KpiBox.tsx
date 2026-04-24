type Props = {
  totalPassengers: number;
  totalCanceledTours: number;
  totalGroup: number;
  totalFree: number;
  totalAdults: number;
  totalYouth: number;
};

export default function KpiBox({
  totalPassengers,
  totalCanceledTours,
  totalGroup,
  totalFree,
  totalAdults,
  totalYouth,
}: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Passengers Over Time</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Passengers</p>
          <p className="text-2xl font-bold">
            {totalPassengers.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Adults</p>
          <p className="text-2xl font-bold">{totalAdults.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Youth</p>
          <p className="text-2xl font-bold">{totalYouth.toLocaleString()}</p>
        </div>

        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Group</p>
          <p className="text-2xl font-bold">{totalGroup.toLocaleString()}</p>
        </div>

        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Free</p>
          <p className="text-2xl font-bold">{totalFree.toLocaleString()}</p>
        </div>

        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Canceled Tours</p>
          <p className="text-2xl font-bold text-red-500">
            {totalCanceledTours.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
