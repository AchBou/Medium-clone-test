import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Article} from '../../models/article.interface';
import {AuthService} from '../../services/auth/auth.service';

const THUMBUP_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px">
  <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/>
  <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.` +
      `17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9` +
      ` 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"/></svg>
`;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  favorite = false;
  liked = false;
  interesting = false;

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              public authService: AuthService) {
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
  }

  ngOnInit(): void {
    this.article.reactions.forEach((reaction) => {
      if ( reaction.owner.id === this.authService.getAuthentfiedUserId()){
        switch (reaction.type){
          case 'liked': this.liked = true; break;
          case 'favorite': this.favorite = true; break;
          case 'interesting': this.interesting = true; break;
        }
      }
    });
  }

}
