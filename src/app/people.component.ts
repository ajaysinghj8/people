import { Component } from '@angular/core';
import { PersonComponent } from './+person';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { AccountComponent } from './+account';

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


import {Person,PeoplelistService, Orderby, Kicker, AuthService} from './shared';

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
    MdIcon],
  providers: [ROUTER_PROVIDERS, MdIconRegistry, MdRadioDispatcher, PeoplelistService, AuthService],
  pipes: [Orderby, Kicker]
})
@Routes([
  { path: '/person', component: PersonComponent },
  { path: '/account', component: AccountComponent }
])
export class PeopleAppComponent {
  formShowing: boolean = false;
  views: Object[] = [
    {
      name: "My Account",
      description: "Edit my account information",
      icon: "assignment ind"
    }
  ];

  people: FirebaseListObservable<Person[]>;

  constructor(public ppl: PeoplelistService, public authService: AuthService) {
    this.people = ppl.get();
  }
  submitCard(profileForm) {
    this.formShowing = false;
    var p = <Person>profileForm.value;
    this.ppl.add(p);

  }
}
