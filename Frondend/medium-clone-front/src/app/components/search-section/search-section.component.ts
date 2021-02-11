import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/articles/article.service';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent implements OnInit {

  results = [];

  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
  }

  search(e): void {
    this.articleService.searchArticlesByKeywords(e).subscribe((res) => {
      this.results = res;
    }, error => {
      console.log(error);
    });
  }
}
