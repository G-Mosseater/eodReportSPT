import { useEffect, useState, useRef } from "react";
import { formatIsk } from "../helpers/formatCurrency";
import { PaymentProps } from "../types/payment";

export function PaymentSummary({ onChange, data }: PaymentProps) {
  const { cash, card, voucher, notes, g11, ae5, receptionStaff, guides } = data;
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const totalWalkins = g11 + ae5;
  const total = cash + card + voucher;

  useEffect(() => {
    const newData = {
      cash,
      card,
      voucher,
      total,
      notes,
      g11,
      ae5,
      receptionStaff,
      guides,
    };
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onChange(newData);
    }, 1000);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [cash, card, voucher, notes, ae5, g11, receptionStaff, guides, onChange]);

  return (
    <div className="flex flex-col gap-3 lg:gap-6 p-3 lg:p-4 border rounded w-full mt-4">
      <label className="text-sm font-medium text-muted-foreground ">
        <span className="border-b border-current pb-0.5">Payments</span>
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
        {[
          ["Cash", cash, "cash"],
          ["Card", card, "card"],
          ["Voucher", voucher, "voucher"],
        ].map(([label, value, key]) => (
          <div key={label} className="flex flex-col">
            <label className="text-xs lg:text-sm font-medium text-muted-foreground mb-1">
              {label}
            </label>

            <input
              type="number"
              value={value}
              onChange={(e) =>
                onChange({
                  ...data,
                  [key]: e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
              className="border rounded px-2 py-1.5 lg:px-3 lg:py-2 w-full text-sm lg:text-base focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label className="text-xs lg:text-sm font-medium text-muted-foreground mb-1 ">
            Total
          </label>

          <input
            type="text"
            readOnly
            value={formatIsk(total)}
            className="border rounded px-2 py-1.5 lg:px-3 lg:py-2 w-full bg-muted text-sm lg:text-base font-medium focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
          />
        </div>
      </div>

      <div>
        <div className="mb-4">
          <label className="text-sm font-medium text-muted-foreground">
            <span className="border-b border-current pb-0.5">Walk-ins</span>
          </label>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col ">
            <label className="text-xs font-medium text-muted-foreground mb-1">
              G11
            </label>

            <input
              type="number"
              value={g11}
              onChange={(e) =>
                onChange({
                  ...data,
                  g11: e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
              className="border rounded px-2 py-1.5 w-full focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-1">
              AE5
            </label>

            <input
              type="number"
              value={ae5}
              onChange={(e) =>
                onChange({
                  ...data,
                  ae5: e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
              className="border rounded px-2 py-1.5 w-full focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-1">
              Total walkins
            </label>

            <input
              type="number"
              value={totalWalkins}
              readOnly
              className="border rounded px-2 py-1.5 w-full bg-muted font-medium focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow ">
        <label className="text-sm font-medium text-muted-foreground mb-1">
          Group info / Cash to bank / Private tours
        </label>

        <textarea
          value={notes}
          onChange={(e) =>
            onChange({
              ...data,
              notes: e.target.value,
            })
          }
          className="border rounded px-3 py-2 w-full h-24 text-base overflow-auto resize-y focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Write details here..."
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs font-medium text-muted-foreground mb-1">
          Reception Staff
        </label>

        <input
          type="text"
          value={receptionStaff}
          onChange={(e) =>
            onChange({
              ...data,
              receptionStaff: e.target.value,
            })
          }
          placeholder="e.g. Jim, Jesus, Hanz"
          className="border rounded px-2 py-1.5 max-w-[500px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs font-medium text-muted-foreground mb-1">
          Guides
        </label>

        <input
          type="text"
          value={guides}
          onChange={(e) =>
            onChange({
              ...data,
              guides: e.target.value,
            })
          }
          placeholder="e.g. Orn, Gummi, Fusi"
          className="border rounded px-2 py-1.5 max-w-[500px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
}
