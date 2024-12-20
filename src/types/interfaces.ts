import { ListingStatus, RequestStatus } from "@/types/types";

export interface Period {
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
  rentedPeriod: Period;
  status: RequestStatus;
}

export interface Listing {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  localization: string;
  rentedPeriods: Period[];
  status: ListingStatus;
}

export interface Rental {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  localization: string;
  rentedPeriod: Period;
}
