import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { Kicker } from './kicker.pipe';

describe('Kicker Pipe', () => {
  beforeEachProviders(() => [Kicker]);

  it('should transform the input', inject([Kicker], (pipe: Kicker) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
