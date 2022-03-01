import { ArrayReversePipe } from './array-reverse.pipe';

describe('ArrayReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayReversePipe();
    expect(pipe).toBeTruthy();
  });
});
