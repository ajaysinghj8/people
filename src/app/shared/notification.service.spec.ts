import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('Notification Service', () => {
  beforeEachProviders(() => [NotificationService]);

  it('should ...',
      inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));
});
