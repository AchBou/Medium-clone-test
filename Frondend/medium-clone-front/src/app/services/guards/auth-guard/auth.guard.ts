import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {LocalstorageService} from '../../utils/localstorage/localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  token;

  constructor(private authService: AuthService,
              private router: Router,
              private localStorage: LocalstorageService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {return true; }
    else {
      return this.router.parseUrl('/login'); }
  }
}
