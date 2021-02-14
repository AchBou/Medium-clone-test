import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url = 'http://localhost:3000/api/articles';  // URL to web api ( Express / NodeJs )

  private authUserId;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization :  JSON.parse(localStorage.getItem('token'))}),
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authUserId =  this.authService.getAuthentfiedUserId();
  }

  getArticlesByUser(): Observable<any>{
    const id = this.authService.getAuthentfiedUserId();
    return this.http.get<any[]>(this.url , this.httpOptions);
  }

  searchArticlesByKeywords(keywords: string): Observable<any>{
    return this.http.get<any[]>(this.url + '?page=1&content=' + keywords , this.httpOptions);
  }

  getArticleById(id: number): Observable<any> {
    return this.http.get<any[]>(this.url + '/' + id , this.httpOptions);
  }

  addArticle(name: string,  content: string , draft: boolean, tags: string[], reference: string): Observable<any>{
    console.log(tags);
    const article = {name, reference, content, draft, tags, owner: '/api/users/' + this.authUserId};
    console.log(article);
    return this.http.post<any[]>(this.url , article, this.httpOptions);
  }

  updateArticle(id: number, name: string,  content: string , draft: boolean, tags: string[], reference: string): Observable<any>{
    const article = {name, reference, content, draft, tags, owner: '/api/users/' + this.authUserId};
    return this.http.put<any[]>(this.url + '/' + id, article , this.httpOptions);
  }

  removeReaction(id: number): Observable<any>{
    return this.http.delete<any[]>(this.url + '/' + id , this.httpOptions);
  }
}
