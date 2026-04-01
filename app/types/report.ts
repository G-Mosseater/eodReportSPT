import { PaymentProps } from "./payment";
import { TourRowProps } from "./tourRow";

export interface ReportProps {
  _id: string;
  rows: TourRowProps[];
  payment: PaymentProps;
  createdAt: string;
  __v: number;
}
