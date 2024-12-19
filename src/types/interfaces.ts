import { RequestStatus } from "@/types/types";

export interface ReservedPeriod {
  startDate: string;
  endDate: string;
}

export interface Request {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  localization: string;
  rentedPeriod: { from: string; to: string };
  status: RequestStatus;
}
