import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor() { }
  login(email: string, pwd: string): void{
    if (email === 'bounane.ach@gmail.com' && pwd === 'test') { this.isLoggedIn = true; }
    else { this.isLoggedIn = false; }
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
