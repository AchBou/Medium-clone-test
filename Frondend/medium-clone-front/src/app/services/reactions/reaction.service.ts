import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private url = 'http://localhost:3000/api/reactions';  // URL to web api ( Express / NodeJs )

  private authUserId;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization :  JSON.parse(localStorage.getItem('token'))}),
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authUserId =  this.authService.getAuthentfiedUserId();
  }


  getReactions(articleId: number): Observable<any>{
    const query = '?page=1&owner=' + this.authUserId + '&article=' + articleId;
    return this.http.get<any[]>(this.url + query , this.httpOptions);
  }

  addReaction(type: string , articleId: number): Observable<any>{
    const reaction = {type, article: '/api/articles/' + articleId , owner: '/api/users/' + this.authUserId};
    return this.http.post<any[]>(this.url , reaction, this.httpOptions);
  }

  updateReaction(id: number, type: string , articleId: number): Observable<any>{
    const reaction = {type, article: '/api/articles/' + articleId , owner: '/api/users/' + this.authUserId};
    return this.http.put<any[]>(this.url + '/' + id, reaction , this.httpOptions);
  }

  removeReaction(id: number): Observable<any>{
    return this.http.delete<any[]>(this.url + '/' + id , this.httpOptions);
  }
}
