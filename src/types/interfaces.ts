import { ListingStatus, RequestStatus } from "@/types/types";

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Period {
  startDate: string;
  endDate: string;
}

export interface ReservedPeriod {
  start_date: string;
  end_date: string;
}

export interface Request {
  id: number;
  start_date: string;
  end_date: string;
  status: RequestStatus;
  listing: Listing;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: number;
  image: string;
  name: string;
  category_id: string;
  price: number;
  currency: string;
  localization: string;
  reserved_periods?: ReservedPeriod[];
  status: ListingStatus;
}

export interface Rental {
  id: number;
  listing: Listing;
  owner: User;
  borrower: User;
  request: Request;
}

export interface RegisterAuthValues {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface RegisterPersonalDataValues {
  name: string;
  surname: string;
  city: string;
  province: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  city: string;
  province: string;
  profile_image: string | null;
  status: "active" | "deleted";
  created_at: string;
  updated_at: string;
}

export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  surname: string;
  city: string;
  province: string;
}
