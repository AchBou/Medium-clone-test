import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/articles/article.service';
import {Tag} from '../../models/tag.interface';

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
    if (e === '') {this.results = []; }
    else{
      this.articleService.searchArticlesByKeywords(e).subscribe((res) => {
        this.results = res;
      }, error => {
        console.log(error);
      });
    }
  }

  searchByTag(tags: Tag[]): void {
    console.log('search by tag');
  }
}
