import { TourKey } from "../helpers/tours";
import { PaymentData } from "./payment";

export interface ReportProps {
  _id: string;
  rows: ReportRow[];
  payment: PaymentData;
  createdAt: string;
  __v: number;
}



export interface ReportRow {
  _id?: string;
  tourName: TourKey;
  hour: string;
  boat: string;
  adults: number;
  youth: number;
  child: number;
  groups: number;
  free: number;
  total: number;
  status: "Active" | "Canceled" | string;
}