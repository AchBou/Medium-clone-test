import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {Tag} from '../../../models/tag.interface';
import {Article} from '../../../models/article.interface';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url = environment.apiUrl + '/articles';  // URL to web api ( Express / NodeJs )

  private authUserId;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'x-access-token' :  localStorage.getItem('token')}),
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authUserId =  this.authService.getAuthentfiedUserId();
  }

  getArticlesByUser(): Observable<Article[]>{
    const id = this.authService.getAuthentfiedUserId();
    return this.http.get<Article[]>(this.url , this.httpOptions);
  }

  searchArticlesByKeywords(keywords: string): Observable<Article[]>{
    return this.http.get<Article[]>(this.url + '?keywords=' + keywords , this.httpOptions);
  }

  searchArticlesByTags(tags: Tag[]): Observable<Article[]>{
    let query = '?tags=';
    for (const tag of tags){
      query += tag.id + ',';
    }
    console.log(query);
    return this.http.get<Article[]>(this.url + query , this.httpOptions);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(this.url + '/' + id , this.httpOptions);
  }

  addArticle(name: string,  content: string , draft: boolean, tags: string[], reference: string): Observable<Article>{
    console.log(tags);
    const article = {name, reference, content, draft, tags, userId: this.authUserId};
    console.log(article);
    return this.http.post<Article>(this.url , article, this.httpOptions);
  }

  updateArticle(id: number, name: string,  content: string , draft: boolean, tags: string[], reference: string): Observable<Article>{
    const article = {name, reference, content, draft, tags, userId: this.authUserId};
    return this.http.put<Article>(this.url + '/' + id, article , this.httpOptions);
  }

  removeArticle(id: number): Observable<Article>{
    return this.http.delete<Article>(this.url + '/' + id , this.httpOptions);
  }
}
