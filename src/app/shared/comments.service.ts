import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


import {Person} from '../shared';
export interface IComment {
  type: string,
  message: string,
  owner: {
    name: string,
    image: string,
    uid: string,
  }
  timestamp: number
}

@Injectable()
export class CommentsService {

  constructor(private af: AngularFire) {

  }

  getUserComments(uid: string): FirebaseListObservable<any[]> {
    return this.af.database.list('/comments/' + uid);
  }
  addUserComment(onUid: string, comment: IComment, onWho: Person) {
    this.af.database.list('/comments/' + onUid).push(comment);
    this.af.database.list('/notifications').push(
      {
        type: 'comment',
        message: comment.owner.name + ' just commented on ' + ((comment.owner.uid === onWho.uid) ? 'Himself' : onWho.name) + '.',
        uid: onUid,
        title: comment.owner.name,
        timestamp: +new Date
      }
    );
  }
}
