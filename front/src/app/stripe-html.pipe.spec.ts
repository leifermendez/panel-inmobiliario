import { StripeHtmlPipe } from './stripe-html.pipe';

describe('StripeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new StripeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
