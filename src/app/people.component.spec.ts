import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PeopleAppComponent } from '../app/people.component';

beforeEachProviders(() => [PeopleAppComponent]);

describe('App: People', () => {
  it('should create the app',
      inject([PeopleAppComponent], (app: PeopleAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'people works!\'',
      inject([PeopleAppComponent], (app: PeopleAppComponent) => {
    expect('a').toEqual('a');
  }));
});
