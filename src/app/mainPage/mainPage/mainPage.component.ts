import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, AuthenticationService } from '@app/services';

@Component({
  templateUrl: './mainPage.component.html',
  styleUrls: ['./mainPage.component.css']
})
export class MainPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
  private userService: UserService,
  private formBuilder: FormBuilder,
  ) {}

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
    .pipe(first())
    .subscribe(
      data => {
        return;
      },
      error => {
        return error;
      }
    );
  }
  }

}
