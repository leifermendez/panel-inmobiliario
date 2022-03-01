import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayReverse'
})
export class ArrayReversePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    try {
      return value.reverse()
    } catch (e) {
      return value
    }
  }

}
