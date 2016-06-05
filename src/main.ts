import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS }  from '@angular/http'

import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthMethods, AuthProviders } from 'angularfire2';

import { PeopleAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(PeopleAppComponent, [
  HTTP_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://srijan.firebaseio.com/'),
  firebaseAuthConfig({
    provider: AuthProviders.Google,
    method: AuthMethods.Popup
  })
]);

