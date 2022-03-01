import {Accommodation} from "./Accommodation.model";

export class DocsModel {
  _id: string;
  observation: string;
  name: string;
  form: any;
  values: any;
  accommodation: Accommodation;
  createdAt: string;
  updatedAt: string;
  percentage: number |string;
}
