import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { PeoplelistService } from './peoplelist.service';

describe('Peoplelist Service', () => {
  beforeEachProviders(() => [PeoplelistService]);

  it('should ...',
      inject([PeoplelistService], (service: PeoplelistService) => {
    expect(service).toBeTruthy();
  }));
});
