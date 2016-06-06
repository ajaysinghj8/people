import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

import { AuthService, Person, CommentsService, Orderby } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css'],
  providers: [MdIconRegistry, MdRadioDispatcher, CommentsService],
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
  ],
  pipes:[Orderby]
})
export class AccountComponent implements OnInit {
  public isEditFormShowing: boolean = false;
  public accountInfo: Person = new Person('', '', '', '', '', '', false);
  public comments: FirebaseListObservable<any[]>;
  constructor(private router: Router, private authService: AuthService, private commentService: CommentsService) {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/']);
      return this;
    }
    this.accountInfo = this.authService.currentUser;
  }

  ngOnInit() {
    this.comments = this.commentService.getUserComments(this.accountInfo.uid);
  }

  submitUserInfo(profileForm) {
    this.isEditFormShowing = false;
    let p = <Person>profileForm.value;
    if (p.isFullStack) {
      p.isFullStack = p.isFullStack['checked'];
    }
    p.uid = this.accountInfo.uid;
    p.id = this.accountInfo.id;
    p.desc= p.desc?p.desc:'';
    p.maritalstatus = p.maritalstatus?p.maritalstatus:'';
    p.isFullStack = p.isFullStack?p.isFullStack:false;
    this.authService.updateAccount(p).then(userInfo => {
      this.accountInfo = this.authService.currentUser;
    });
  }
  submitUserComment(commentForm) {
    let comment = commentForm.value;
    comment.timestamp = +new Date;
    comment.owner = {
      name: this.accountInfo.name,
      image: this.accountInfo.image,
      uid: this.accountInfo.uid
    };
    this.commentService.addUserComment(this.accountInfo.uid, comment, this.accountInfo);
  }
}
