import { FaChild } from "react-icons/fa";
import { MdCancel, MdOutlineDiscount, MdGroups2 } from "react-icons/md";
import { LiaUsersSolid } from "react-icons/lia";
import { ImUser } from "react-icons/im";
type Props = {
  totalPassengers: number;
  totalCanceledTours: number;
  totalGroup: number;
  totalFree: number;
  totalAdults: number;
  totalYouth: number;
  // payment: {
  //   cash: number;
  //   voucher: number;
  //   card: number;
  // };
};

export default function KpiBox({
  totalPassengers,
  totalCanceledTours,
  totalGroup,
  totalFree,
  totalAdults,
  totalYouth,
  // payment,
}: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Passengers Over Time</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Passengers</p>
            <LiaUsersSolid className="text-primary text-2xl" />
          </div>
          <p className="text-2xl font-bold">
            {totalPassengers.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Adults</p>
            <ImUser className="text-primary text-2xl" />
          </div>
          <p className="text-2xl font-bold">{totalAdults.toLocaleString()}</p>
        </div>
        <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Youth</p>
            <FaChild className="text-primary text-2xl" />
          </div>
          <p className="text-2xl font-bold">{totalYouth.toLocaleString()}</p>
        </div>

        <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Group</p>
            <MdGroups2 className="text-primary text-2xl" />
          </div>
          <p className="text-2xl font-bold">{totalGroup.toLocaleString()}</p>
        </div>

        <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Free</p>
            <MdOutlineDiscount className="text-primary text-2xl" />
          </div>
          <p className="text-2xl font-bold">{totalFree.toLocaleString()}</p>
        </div>
        <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Canceled</p>
            <MdCancel className="text-primary text-2xl" />
          </div>
          <p className="text-2xl font-bold text-red-500">
            {totalCanceledTours.toLocaleString()}
          </p>
        </div>
        {/* <div className="p-4 rounded-lg border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Cash Payment</p>
          <p className="text-2xl font-bold">{payment.cash.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Card Payment</p>
          <p className="text-2xl font-bold">{payment.card.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Voucher Payment</p>
          <p className="text-2xl font-bold">
            {payment.voucher.toLocaleString()}
          </p>
        </div> */}
      </div>
    </div>
  );
}
