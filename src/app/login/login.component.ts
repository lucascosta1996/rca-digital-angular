import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from '@app/services';

@Component({ 
  templateUrl: 'login.component.html',
  selector: 'app-login',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  loginError = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.resetForm()
  }

  resetForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        ( data: any ) => {
          this.loading = false;
          this.loginError = false;
          this.resetForm();
          this.http.put( '/cart/update', options )
            .pipe()
            .subscribe();
          return;
        },
        ( error: any ) => {
          this.loading = false;
          this.loginError = true;
          return error;
        });
  }
}