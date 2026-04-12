import { TourKey } from "../helpers/tours";
import { PaymentData } from "./payment";

export interface TourRowProps {
  rowId: string;
  tourName: TourKey;
  boatOptions: string[];
  departureTimes: string[];

  onChange: (rowId: string, data: Partial<TourRowProps>) => void;
  onRemove: (rowId: string) => void;

  payment?: PaymentData;

  initialData?: Partial<Omit<TourRowProps, "rowId" | "onChange" | "onRemove" | "boatOptions" | "departureTimes">>;
}