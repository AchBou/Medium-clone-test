import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/api/articles/article.service';
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
              private route: ActivatedRoute,
              public articleService: ArticleService) { }

  ngOnInit(): void {
    const articleId = Number(this.route.snapshot.paramMap.get('articleId'));
    if (articleId) {
      this.articleService.getArticleById(articleId).subscribe(res => {
        this.currentArticle = res;
      }, err => {
        console.error(err.error);
      });
    } else {
      this.articleService.getArticlesByUser().subscribe((res) => {
        const randomArticleId = this.getRandomInt(res.length);
        this.currentArticle = res[randomArticleId];
        console.log(this.currentArticle);
      }, err => {
        console.error(err.error);
      });
    }
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
