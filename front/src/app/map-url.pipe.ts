import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "../environments/environment";

@Pipe({
  name: 'mapUrl'
})
export class MapUrlPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    try {
      const q = ['https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/',
        `${value.join(',')}`,
        ',14,0.00,0.00',
        '/200x200@2x?access_token=',
        environment.mapbox
      ];
      return q.join('');
    } catch (e) {
      return null
    }
  }

}
