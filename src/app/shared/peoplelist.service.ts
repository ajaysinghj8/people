import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import {Person} from './person';

@Injectable()
export class PeoplelistService {

  constructor(public af: AngularFire) {

  }
  getList(): FirebaseListObservable<Person[]> {
    return this.af.database.list('/user');
  }
  get(uid:string): FirebaseObjectObservable<any>{
    return this.af.database.object('/user/'+uid);
  }
  

}
