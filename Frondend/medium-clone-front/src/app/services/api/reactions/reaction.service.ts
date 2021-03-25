import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {Reaction} from '../../../models/reaction.interface';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private url = environment.apiUrl + '/reactions';  // URL to web api ( Express / NodeJs )

  private authUserId;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'x-access-token' :  localStorage.getItem('token')}),
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authUserId =  this.authService.getAuthentfiedUserId();
  }


  getReactions(): Observable<Reaction[]>{
    return this.http.get<Reaction[]>(this.url  , this.httpOptions);
  }

  getReactionsByArticle(id: number): Observable<Reaction[]>{
    return this.http.get<Reaction[]>(this.url + '?articleId=' + id, this.httpOptions);
  }

  addReaction(type: string , articleId: number): Observable<Reaction>{
    const reaction = {type, articleId , userId: this.authUserId};
    return this.http.post<Reaction>(this.url , reaction, this.httpOptions);
  }

  updateReaction(id: number, type: string , articleId: number): Observable<Reaction>{
    const reaction = {type, articleId , userId: this.authUserId};
    return this.http.put<Reaction>(this.url + '/' + id, reaction , this.httpOptions);
  }

  removeReaction(id: number): Observable<Reaction>{
    return this.http.delete<Reaction>(this.url + '/' + id , this.httpOptions);
  }
}
