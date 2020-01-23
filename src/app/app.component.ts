import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/services';
import { AuthenticationService } from '@app/services'
import { Subscription } from 'rxjs';
import { User } from '@app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }


  ngOnInit() {
    //creating user in my fake backend :)
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      if ( !users.find( ( x: any ) => x.username === 'lucas2' ) ) {
        this.registerForm = this.formBuilder.group({
          firstName: ['Lucas', Validators.required],
          lastName: ['Costa', Validators.required],
          username: ['lucas2', Validators.required],
          password: ['root', [Validators.required, Validators.minLength(6)]]
        });
  
        this.userService.register(this.registerForm.value)
      }

      if ( localStorage.getItem('cart') == null ) {
        let cart: any = [];
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }

    ngDoCheck() {
      this.updateUserCart()
    }

    updateUserCart() {
      if( this.currentUser && JSON.parse( localStorage.cart ).length === 0 ) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find( ( x: any ) => x.username === this.currentUser.username )

        if( user && user.cart ) {
          return localStorage.setItem( 'cart', user.cart )
        }
      }
    }
}
