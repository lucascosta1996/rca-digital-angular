import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser: User;
  currentUserSubscription: Subscription;
  showLogin: boolean = false;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngDoCheck() {
    if (this.currentUser) {
      this.showLogin = false
    }
  }

  showLoginForm() {
    this.showLogin = !this.showLogin
  }

  logout() {
    this.authenticationService.logout();
  }

  scrollTop(){
    window.scrollTo({
      top: 400,
      behavior: 'smooth',
    });
  }
}