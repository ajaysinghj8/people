import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class NotificationService {

  constructor(public af: AngularFire) { }

  getNotifications(): FirebaseListObservable<any[]> {
    return this.af.database.list('/notifications', {
      query: {
        limitToLast: 20
      }
    });
  }
  add(notification:Object): void {
    this.af.database.list('/notification').push(notification);
  }

}
