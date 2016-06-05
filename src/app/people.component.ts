import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdInput} from '@angular2-material/input';
import { MdCheckbox} from '@angular2-material/checkbox';
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from '@angular2-material/radio';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { FirebaseListObservable } from 'angularfire2';



import { AccountComponent } from './+account';
import { HomeComponent } from './+home';
import { PersonComponent } from './+person';

import {AuthService, NotificationService, Orderby} from './shared';

@Component({
  moduleId: module.id,
  selector: 'people-app',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon
    ],
  providers: [MdIconRegistry, MdRadioDispatcher, NotificationService],
  pipes :[Orderby]
})
@Routes([
  { path: '/', component: HomeComponent },
  { path: '/person/:id', component: PersonComponent },
  { path: '/account', component: AccountComponent },
  { path: '/*', component: HomeComponent }
])
export class PeopleAppComponent {
  formShowing: boolean = false;
  views: Object[] = [
    {
      name: "Home",
      description: "",
      icon: "home",
      route: '/'
    },
    {
      name: "My Account",
      description: "Edit my account information",
      icon: "assignment ind",
      route: '/account'
    }
  ];

  notifications: FirebaseListObservable<any[]>;
  constructor(private authService: AuthService, private notifyService: NotificationService) {
    this.notifications = this.notifyService.getNotifications();
  }
  login() {
    this.authService.login();
  }
  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  // submitCard(profileForm) {
  //   this.formShowing = false;
  //   var p = <Person>profileForm.value;
  //   this.ppl.add(p);

  // }
}
