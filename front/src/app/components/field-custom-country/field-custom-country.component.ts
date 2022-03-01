import {Component, OnInit} from '@angular/core';
import {MapBoxCustomService} from "../../modules/map-box/map-box-custom.service";
import {environment} from "../../../environments/environment";
import {FieldType} from "@ngx-formly/core";

@Component({
  selector: 'app-field-custom-country',
  template: `
    <div class="mb-2">
      <label for="formly_12_input_street_0">{{field?.templateOptions?.label}}</label>
      <select class="form-control"  [(ngModel)]="fieldText" [formControl]="formControl" [formlyAttributes]="field">
        <option [value]="item?.value" *ngFor="let item of this.mapBoxCustomService.countries">{{item?.label}}</option>
      </select>
      <div class="form-text text-muted small">
        {{field?.templateOptions?.description}}
      </div>
    </div>
  `,
  styleUrls: ['./field-custom-country.component.scss']
})
export class FieldCustomCountryComponent extends FieldType implements OnInit {

  fieldText: any;

  constructor(public mapBoxCustomService: MapBoxCustomService) {
    super();
  }

  ngOnInit(): void {

  }
}
