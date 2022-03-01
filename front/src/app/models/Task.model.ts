import {Accommodation} from "./Accommodation.model";

export class Task {
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  observation: string;
  attachment: [];
  comments: [];
  accommodation: Accommodation;
  address: string;
  status: string;
}
