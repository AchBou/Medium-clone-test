import {Component, Inject, OnInit} from '@angular/core';
import {Tag} from '../../../models/tag.interface';
import {ArticleService} from '../../../services/articles/article.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Article} from '../../../models/article.interface';

@Component({
  selector: 'app-article-dialog',
  templateUrl: 'article.dialog.html',
  styleUrls: ['article.dialog.css']
  ,
})
export class ArticleDialogComponent  {
  title: string;
  content: string;
  draft = false;
  reference: string;
  tags = [];
  tagsURI = [];

  constructor(public articleService: ArticleService,
              public dialogRef: MatDialogRef<ArticleDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data: any) {
    if (!data){
      this.reference = Math.random().toString(36).substring(7);
    }
    else{
      console.log(data);
      this.title = this.data.name;
      this.content = this.data.content;
      this.reference = this.data.reference;
      this.draft = this.data.draft;
      this.tags = this.data.tags;
    }
  }

  handleTagChange(tags: Tag[]): void {
    this.tags = tags;
  }

  submit(): void{
    if (this.data){
      this.updateArticle();
    }
    else{
      this.addArticle();
    }
  }

  addArticle(): void{
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

  updateArticle(): void{
    this.tagsURI = [];
    this.tags.forEach(tag => {
      this.tagsURI.push('/api/tags/' + tag.id);
    });

    this.articleService.updateArticle(this.data.id, this.title,  this.content, this.draft, this.tagsURI, this.reference).subscribe(res => {
      if (res.id) {
        this.dialogRef.close();
      }
    });
  }

}
