import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AuthService {
  private userInfo: Object ={};
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(userAuth => {
      this.createOrRetriveUserInfo(this.parseSocialInfo(userAuth, userAuth.auth['provider']));
    });
  }
  private parseSocialInfo(auth, provider) {
    if (!auth[provider]) return;
    return {
      uid: auth.uid,
      id: auth[provider].id,
      image: auth[provider].profileImageURL,
      name: auth[provider].displayName
    };
  }
  private createOrRetriveUserInfo(authInfo) {
    this.af.database.list('/user', {
      query: {
        uid: authInfo.uid
      }
    }).subscribe(user => {
      if (user.length) {
        this.userInfo = user[0];
        return;
      }
      // need to create user
      this.af.database.list('/user').push(authInfo);
    });
  }
  get isAuthenticated(){
    return !! this.userInfo['$key'];
  }
  authUser() {
    return this.userInfo;
  }
  login() {
    this.af.auth.login();
  }

}
