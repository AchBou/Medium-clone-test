import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {Tag} from '../../../models/tag.interface';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private url = environment.apiUrl + '/tags';  // URL to web api ( Express / NodeJs )

  private authUserId;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'x-access-token' :  localStorage.getItem('token')}),
  };

  constructor(private http: HttpClient) {
  }


  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(this.url , this.httpOptions);
  }

  getTagsByArticle(articleId: number): Observable<Tag[]>{
    const query = '?articleID' + articleId;
    return this.http.get<Tag[]>(this.url + query , this.httpOptions);
  }

  addTag(title: string ): Observable<Tag>{
    const tag = {title };
    return this.http.post<Tag>(this.url , tag, this.httpOptions);
  }

  updateTag(id: number, type: string , articleId: number): Observable<Tag>{
    const tag = {type,  articleId };
    return this.http.put<Tag>(this.url + '/' + id, tag , this.httpOptions);
  }

  removeTag(id: number): Observable<Tag>{
    return this.http.delete<Tag>(this.url + '/' + id , this.httpOptions);
  }
}
