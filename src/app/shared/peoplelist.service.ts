import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import {Person} from './person';

@Injectable()
export class PeoplelistService {

  constructor(public af: AngularFire) {

  }
  get(): FirebaseListObservable<Person[]> {
    return this.af.database.list('/people');
  }
  add(p: Person): void {
    this.af.database.list('/people').push(p);
  }

}
