import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { Orderby } from './orderby.pipe';

describe('Orderby Pipe', () => {
  beforeEachProviders(() => [Orderby]);

  it('should transform the input', inject([Orderby], (pipe: Orderby) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
