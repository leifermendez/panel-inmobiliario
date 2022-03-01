import { Component, OnInit } from '@angular/core';
import {FieldType} from "@ngx-formly/core";

@Component({
  selector: 'app-field-custom-select',
  template: `
    <div class="mb-2">

      <label for="formly_12_input_street_0">{{field?.templateOptions?.label}}</label>
      <ng-select
        [items]="field?.templateOptions?.options"
        [multiple]="field?.templateOptions?.multiple"
        [selectableGroup]="false"
        [closeOnSelect]="true"
        bindLabel="label"
        bindValue="value" [formControl]="formControl" [formlyAttributes]="field">
        <ng-template ng-optgroup-tmp let-item="item" let-item$="item$" let-index="index">
          <input id="item-{{index}}" type="checkbox" [ngModel]="item$.selected"/> {{item?.label | uppercase}}
        </ng-template>
        <ng-template ng-option-tmp let-item="item" let-item$="item$" let-index="index">
          <input id="item-{{index}}" type="checkbox" [ngModel]="item$.selected"/> {{item?.label}}
        </ng-template>
      </ng-select>
      <div class="form-text text-muted small">
        {{field?.templateOptions?.description}}
      </div>
    </div>
  `,
  styleUrls: ['./field-custom-select.component.scss']
})
export class FieldCustomSelectComponent  extends FieldType implements OnInit {
  fieldText: any;
  selectValue: any;

  constructor() {
    super();
  }

  ngOnInit(): void {

  }
}
