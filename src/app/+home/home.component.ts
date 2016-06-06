import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
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

import {Person, PeoplelistService, Orderby, Kicker, AuthService} from '../shared';


@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [PeoplelistService, MdIconRegistry, MdRadioDispatcher],
  pipes: [Orderby, Kicker],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon,
    ROUTER_DIRECTIVES
  ]
})
export class HomeComponent implements OnInit {
  people: FirebaseListObservable<Person[]>;

  constructor(private ppl: PeoplelistService, private router: Router, private authService:AuthService) { }

  ngOnInit() {
    this.people = this.ppl.getList();
  }
  toUserProfile(pp) {
    this.router.navigateByUrl('/person/' + pp.$key);
  }

}
