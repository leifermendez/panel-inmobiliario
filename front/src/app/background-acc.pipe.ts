import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backgroundAcc'
})
export class BackgroundAccPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value)
    return null;
  }

}
