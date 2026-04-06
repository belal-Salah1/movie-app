import { languagePipe } from './language.pipe';

describe('languagePipe', () => {
  it('create an instance', () => {
    const pipe = new languagePipe();
    expect(pipe).toBeTruthy();
  });
});
