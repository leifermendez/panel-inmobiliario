import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FieldType} from "@ngx-formly/core";
import * as mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {MapBoxCustomService} from "../../modules/map-box/map-box-custom.service";
import {environment} from "../../../environments/environment";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mapboxinput',
  styleUrls: ['./field-custom-map-box.component.scss'],
  template: `
    <div class="mb-2">
      <label for="formly_12_input_street_0">{{field?.templateOptions?.label}}</label>
      <input type="hidden" [(ngModel)]="fieldText" [formControl]="formControl" [formlyAttributes]="field">
      <div id="geocoderCustom" autocomplete="nope" class="geocoderCustom form-control p-0"
           [formlyAttributes]="field"></div>
      <div class="form-text text-muted small">
        {{field?.templateOptions?.description}}
      </div>
    </div>
  `,
})
export class FieldCustomMapBoxComponent extends FieldType implements OnInit {
  fieldText: any;

  constructor(private mapBoxCustomService: MapBoxCustomService) {
    super();
  }

  ngOnInit(): void {
    mapboxgl.accessToken = environment.mapbox;
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
    });
    geocoder.addTo('#geocoderCustom');
    geocoder.setPlaceholder(' ');
    geocoder.on('result', (ev) => {
      const {result} = ev
      this.mapBoxCustomService.result.emit(result)
      this.fieldText = result.place_name;
    });
    geocoder.on('clear', () => {
      this.mapBoxCustomService.result.emit({})
      this.fieldText = '';
    });

    const dom = document.querySelector('.mapboxgl-ctrl-geocoder--input') as any;
    dom.autocomplete = 'nope';
  }

}
