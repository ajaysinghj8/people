import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { CommentsService } from './comments.service';

describe('Comments Service', () => {
  beforeEachProviders(() => [CommentsService]);

  it('should ...',
      inject([CommentsService], (service: CommentsService) => {
    expect(service).toBeTruthy();
  }));
});
