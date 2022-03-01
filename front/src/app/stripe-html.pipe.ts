import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stripeHtml'
})
export class StripeHtmlPipe implements PipeTransform {
  transform(value: string = ''): any {
    try {
      return value.replace(/<.*?>/g, ''); // replace tags
    } catch (e) {
      return null;
    }
  }
}
