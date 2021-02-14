import {Component} from '@angular/core';
import {Tag} from '../../../models/tag.interface';
import {ArticleService} from '../../../services/articles/article.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-article-dialog',
  templateUrl: 'article.dialog.html',
  styleUrls: ['article.dialog.css']
  ,
})
export class ArticleDialogComponent {
  title: string;
  content: string;
  draft = false;
  reference: string;
  tags = [];
  tagsURI = [];

  constructor(public articleService: ArticleService,
              public dialogRef: MatDialogRef<ArticleDialogComponent>) {
    this.reference = Math.random().toString(36).substring(7);
  }

  handleTagChange(tags: Tag[]): void {
    this.tags = tags;
  }

  submit(): void{
    this.tagsURI = [];
    this.tags.forEach(tag => {
      this.tagsURI.push('/api/tags/' + tag.id);
    });

    this.articleService.addArticle(this.title,  this.content, this.draft, this.tagsURI, this.reference).subscribe(res => {
      if (res.id) {
        this.dialogRef.close();
      }
    });
  }


}
