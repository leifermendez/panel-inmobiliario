import {AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FieldType} from "@ngx-formly/core";
import * as moment from "moment"

@Component({
  selector: 'app-field-custom-calendar',
  template: `
    <div class="mb-2 date-calendar-ui-ux">
      <label for="formly_12_input_street_0">{{field?.templateOptions?.label}}</label>
      <input type="text"
             [placeholder]="field?.templateOptions?.placeholder"
             class="form-control" placement="bottom left"
             [(ngModel)]="fieldText"
             [bsConfig]="{ dateInputFormat: 'YYYY-MM-DD' }"
             bsDatepicker [formControl]="formControl" [formlyAttributes]="field">
      <div class="form-text text-muted small">
        {{field?.templateOptions?.description}} --> {{fieldText | json}}
      </div>
    </div>
  `,
  styleUrls: ['./field-custom-calendar.component.scss']
})
export class FieldCustomCalendarComponent extends FieldType implements OnInit, AfterViewChecked {
  fieldText: any;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }


  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if (this.fieldText && (typeof this.fieldText === 'string')) {
      this.fieldText = moment(this.fieldText).toDate()
      this.cd.detectChanges();
    }
  }


}
