import {Injectable} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {MapBoxCustomService} from "../../../map-box/map-box-custom.service";

@Injectable({
  providedIn: 'root'
})
export class StartedService {
  constructor(private mapBoxCustomService: MapBoxCustomService) {
  }

  public fieldsOnBoard: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'on-section-1',
      fieldGroup: [
        {
          key: 'address',
          type: 'mapboxinput',
          templateOptions: {
            label: 'Dirección',
            placeholder: '',
            description: 'Dirección',
            autocomplete: 'nope',
            required: true
          },
        },
        {
          key: 'addressMore',
          type: 'input',
          templateOptions: {
            label: 'Dirección 2',
            placeholder: '',
            description: 'Dirección 2',
            required: false,
            autocomplete: 'nope',
          },
        }
      ],
    },
    {
      template: '<hr />',
    },
    {
      fieldGroupClassName: 'on-section-2 row',
      fieldGroup: [
        {
          className: 'col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4',
          type: 'input',
          key: 'state',
          templateOptions: {
            label: 'Provincia',
            required: true
          },
        },
        {
          className: 'col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4',
          type: 'input',
          key: 'city',
          templateOptions: {
            label: 'City',
            required: true
          },
        },
        {
          className: 'col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4',
          type: 'input',
          key: 'zip',
          templateOptions: {
            required: true,
            type: 'number',
            label: 'Zip',
            max: 99999,
            min: 0,
            pattern: '\\d{5}',
          },
        },
        {
          className: 'col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12',
          type: 'select',
          key: 'country',
          templateOptions: {
            label: 'País',
            options: this.mapBoxCustomService.countries,
          },
        },
      ],
    }
  ];

  public fieldsTermsOnBoard: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'form-group',
      fieldGroup: [
        {
          key: 'check',
          type: 'checkbox',
          className: 'mt-4',
          templateOptions: {
            label: 'Agree? (not initialized at all)',
            required: true,
          },
        }
      ]
    }
  ];
}
