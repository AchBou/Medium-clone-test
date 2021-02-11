import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {passwordMatchValidator} from './password-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  msg = {isError: null, text: ''};

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  pwdFormControl = new FormControl('', [
    Validators.required,
  ]);

  pwdCFormControl = new FormControl('', [
    Validators.required,
    passwordMatchValidator
  ]);

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    const username = this.usernameFormControl.value;
    const email = this.emailFormControl.value;
    const password = this.pwdFormControl.value;
    this.authService.signup({username, email, role: 'user', password}).subscribe((res) => {
      if (res) {
        console.log(res);
        this.msg.isError = false;
        this.msg.text = 'Account created Successfully';
      }
    }, (err) => {
      console.error(err);
      this.msg.isError = true;
      this.msg.text = err.error;
    });
  }

  test() {
    console.log(this.pwdCFormControl.value === this.pwdFormControl.value);
    console.log(this.pwdCFormControl.value);
    console.log(this.pwdFormControl.value);
  }
}
