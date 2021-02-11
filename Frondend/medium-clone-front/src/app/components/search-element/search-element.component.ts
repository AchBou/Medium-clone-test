import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-element',
  templateUrl: './search-element.component.html',
  styleUrls: ['./search-element.component.css']
})
export class SearchElementComponent implements OnInit {
  @Input() result;

  constructor() {
  }

  ngOnInit(): void {
  }

  goToArticle() {
    console.log('clicked');
  }
}
