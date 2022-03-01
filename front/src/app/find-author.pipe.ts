import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findAuthor'
})
export class FindAuthorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value)
    return null;
  }

}
