import {Accommodation} from "./Accommodation.model";

export class BookingModel {
  _id: string;
  localizator: string;
  createdAt: string;
  guest: GuestModel;
  portal: string;
  accommodation: Accommodation;
  comments: [];
  adults: number;
  kids: number;
  checkIn: string;
  checkOut: string;
  nights: number;
}

export class GuestModel {
  name: string;
  createdAt: string;
  phone: string;
  email: string;
  lastName: string;
  gender: string;
  nationality: string;
  language: string;
}
