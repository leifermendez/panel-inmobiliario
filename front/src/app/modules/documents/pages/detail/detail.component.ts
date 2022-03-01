import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  form = new FormGroup({});
  model = {email: 'email@gmail.com'};
  fields: FormlyFieldConfig[] = [
    {
      key: 'rent_type',
      type: 'select',
      templateOptions: {
        label: 'Tipo de renta',
        placeholder: '',
        description: 'Description',
        required: true,
        options: [
          { value: 1, label: 'Option 1'  },
          { value: 2, label: 'Option 2'  },
          { value: 3, label: 'Option 3'  },
        ],
      },
    },
    {
      key: 'renting_price',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Precio renting',
        placeholder: '0',
        required: true,
      }
    },
    {
      key: 'cleaning_price',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Precio limpieza',
        placeholder: '0',
        required: true,
      }
    }
  ];
  history: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
