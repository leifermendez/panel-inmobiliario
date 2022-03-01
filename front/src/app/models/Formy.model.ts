import {FormlyFieldConfig} from "@ngx-formly/core";

export class FormyModel {
  _id: string;
  endPoint: string;
  terms: string;
  name: string;
  fields: FormlyFieldConfig;
  slug: string;
}
