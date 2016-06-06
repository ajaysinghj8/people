import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Person } from '../shared';

@Injectable()
export class AuthService {
  public userInfo: Person;
  public isAuthenticated: boolean = false;
  constructor(private af: AngularFire) {
    this.af.auth.subscribe(userAuth => {
      if (!userAuth) return;
      this.createOrRetriveUserInfo(this.parseSocialInfo(userAuth, userAuth.auth['provider']));
    });
  }
  private parseSocialInfo(auth, provider): Object {
    if (!auth[provider]) return;
    return {
      uid: auth.uid,
      id: auth[provider].id,
      image: auth[provider].profileImageURL,
      name: auth[provider].displayName
    };
  }
  private createOrRetriveUserInfo(authInfo): void {
    this.af.database.object('/user/' + authInfo.uid).subscribe(user => {
      if (user) {
        this.userInfo = user;
        this.isAuthenticated = true;
        return;
      }
      // need to create user
      this.af.database.object('/user/' + authInfo.uid).set(authInfo);
      this.af.database.list('/notifications').push({
        type: 'newuser',
        title: authInfo.name,
        uid: authInfo.uid,
        message: authInfo.name + ' has just joined.'
      });
    });
  }
  get currentUser(): Person {
    return this.userInfo;
  }
  updateAccount(p: Person): Promise<Person | void> {
    if (this.isAuthenticated)
      return this.af.database.object('/user/' + this.userInfo.uid).set(p).then(empty => {
        this.af.database.list('/notifications').push(
          {
            type: 'profileupdate',
            message: p.name+ ' updated his/her profile.',
            uid: p.uid,
            title: p.name,
            timestamp: +new Date
          }
        );
        return;
      });
    return Promise.reject('');
  }
  login() {
    this.af.auth.login();
  }

}
