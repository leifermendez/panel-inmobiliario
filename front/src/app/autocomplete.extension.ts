import { Component } from '@angular/core';
import { Validators, FormControl, ValidationErrors } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

export function applyAutocompleteExtension(field: FormlyFieldConfig) {
  if (field.type !== 'input') {
    return;
  }

  field.templateOptions = field.templateOptions || {};
  field.templateOptions.attributes = field.templateOptions.attributes || {};
  field.templateOptions.attributes.autocomplete = 'nope';
}
