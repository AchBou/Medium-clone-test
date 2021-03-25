import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {LocalstorageService} from '../../services/utils/localstorage/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checked = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  pwdFormControl = new FormControl('', [
    Validators.required,
  ]);

  errorMsg = '';

  constructor( public authService: AuthService,
               private localStorage: LocalstorageService,
               public router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    const email = this.emailFormControl.value;
    const pwd = this.pwdFormControl.value;
    this.authService.login(email, pwd).subscribe((res) => {
      if (res) {
        this.localStorage.clear();
        console.log(res.accessToken);
        this.localStorage.setItem('token', res.accessToken);
        this.router.navigate(['/']);
      }
    } , (err) => {
      console.error(err);
      this.errorMsg = err.error.message;
    });
  }
}
