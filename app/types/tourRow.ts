import { TourKey } from "../helpers/tours";
import { PaymentData } from "./payment";
import { ReportRow } from "../types/report";

export interface TourRowProps {
  rowId: string;
  tourName: TourKey;
  boatOptions: string[];
  departureTimes: string[];

  onChange: (rowId: string, data: ReportRow) => void;
  onRemove: (rowId: string) => void;

  payment?: PaymentData;

  initialData?: Partial<ReportRow>;
}
