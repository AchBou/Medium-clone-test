import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checked = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  pwdFormControl = new FormControl('', [
    Validators.required,
  ]);

  checkBoxControl = new FormControl('auto');

  constructor( public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    const email = this.emailFormControl.value;
    const pwd = this.pwdFormControl.value;
    this.authService.login(email, pwd);
    this.router.navigate(['/']);
  }
}
