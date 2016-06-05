import { Component, OnInit } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdInput} from '@angular2-material/input';
import { MdCheckbox} from '@angular2-material/checkbox';
import { MdRadioButton, MdRadioGroup, MdRadioDispatcher } from '@angular2-material/radio';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';


import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import {AuthService, PeoplelistService, CommentsService, Orderby, Person} from '../shared';


@Component({
  moduleId: module.id,
  selector: 'app-person',
  templateUrl: 'person.component.html',
  styleUrls: ['person.component.css'],
  providers: [PeoplelistService, CommentsService, MdIconRegistry, MdRadioDispatcher],
  pipes: [Orderby],
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
    MdIcon
  ]
})
export class PersonComponent implements OnInit {
  public uid : string;
  public user: FirebaseObjectObservable<Person>;
  public userInfo :Person;
  public comments: FirebaseListObservable<any[]>;
  constructor(
    private router: Router,
    private routeSegment: RouteSegment,
    private ppp: PeoplelistService,
    private commentService: CommentsService,
    private authService: AuthService
  ) {
    this.uid = routeSegment.getParam('id');
    if (!this.uid) {
      router.navigateByUrl('/');
      return this;
    }
    this.user = this.ppp.get(this.uid);
    this.user.subscribe(userInfo=>{
      this.userInfo = <Person>userInfo;
    });
    this.comments = this.commentService.getUserComments(this.uid);
  }


  ngOnInit() {

  }
  submitUserComment(commentForm) {
    let comment = commentForm.value;
    comment.timestamp = +new Date;
    if (this.authService.isAuthenticated) {
      let loggedInUser = this.authService.currentUser;
      if(!loggedInUser.uid || ! this.userInfo.name) return ;
      comment.owner = {
        name: loggedInUser.name,
        image: loggedInUser.image,
        uid: loggedInUser.uid
      };
      this.commentService.addUserComment(this.uid, comment, this.userInfo);
    }

  }

}
