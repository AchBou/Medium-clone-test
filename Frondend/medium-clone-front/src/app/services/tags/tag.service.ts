import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private url = 'http://localhost:3000/api/tags';  // URL to web api ( Express / NodeJs )

  private authUserId;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization :  JSON.parse(localStorage.getItem('token'))}),
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authUserId =  this.authService.getAuthentfiedUserId();
  }


  getAllTags(): Observable<any>{
    return this.http.get<any[]>(this.url , this.httpOptions);
  }

  getTagsByArticle(articleId: number): Observable<any>{
    const query = '?page=1&owner=' + this.authUserId + '&article=' + articleId;
    return this.http.get<any[]>(this.url + query , this.httpOptions);
  }

  addTag(title: string ): Observable<any>{
    const tag = {title };
    return this.http.post<any[]>(this.url , tag, this.httpOptions);
  }

  updateTag(id: number, type: string , articleId: number): Observable<any>{
    const tag = {type, article: '/api/articles/' + articleId , owner: '/api/users/' + this.authUserId};
    return this.http.put<any[]>(this.url + '/' + id, tag , this.httpOptions);
  }

  removeTag(id: number): Observable<any>{
    return this.http.delete<any[]>(this.url + '/' + id , this.httpOptions);
  }
}
