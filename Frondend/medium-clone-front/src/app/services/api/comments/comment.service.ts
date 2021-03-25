import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {Comment} from '../../../models/comment.interface';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = environment.apiUrl + '/comments';  // URL to web api ( Express / NodeJs )

  private authUserId;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'x-access-token' :  localStorage.getItem('token')}),
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authUserId =  this.authService.getAuthentfiedUserId();
  }


  getComments(articleId: number): Observable<Comment[]>{
    const query = '?page=1&owner=' + this.authUserId + '&article=' + articleId;
    return this.http.get<Comment[]>(this.url + query , this.httpOptions);
  }

  addComment(content: string , articleId: number): Observable<Comment>{
    const comment = {content, articleId , userId: this.authUserId};
    return this.http.post<Comment>(this.url , comment, this.httpOptions);
  }

  updateComment(id: number, content: string ): Observable<Comment>{
    const comment = {content, owner: '/api/users/' + this.authUserId};
    return this.http.put<Comment>(this.url + '/' + id, comment , this.httpOptions);
  }

  removeComment(id: number): Observable<Comment[]>{
    return this.http.delete<Comment[]>(this.url + '/' + id , this.httpOptions);
  }
}
