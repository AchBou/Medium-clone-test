import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {ArticleService} from '../../services/articles/article.service';
import {Article} from '../../models/article.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentArticle: Article;

  constructor(private authService: AuthService,
              private router: Router,
              public articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticlesByUser().subscribe((res) => {
      const randomArticleId = this.getRandomInt(res.length);
      this.currentArticle = res[randomArticleId];
      console.log(this.currentArticle);
    }, err => {
      console.error(err.error);
    });
  }

  // function to return random article from the articles list of a user
  private getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
