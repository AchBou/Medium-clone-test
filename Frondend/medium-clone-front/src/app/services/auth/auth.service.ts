import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/';  // URL to web api ( Express / NodeJs )

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<any>{
     return this.http.post<any[]>(this.url + 'login', {email, password})
  }

  signup(user): Observable<any>{
    return this.http.post<any[]>(this.url + 'signup', user);
  }

  logout(): void {
    localStorage.clear();
  }

  getAuthentfiedUserId(): number {
    const token = JSON.parse(localStorage.getItem('token'));
    const decoded: any = jwt_decode(token);

    return decoded.user_id;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
