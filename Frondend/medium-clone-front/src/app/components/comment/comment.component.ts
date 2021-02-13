import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../models/comment.interface';
import {ArticleDialogComponent} from '../article/article-dialog/article.dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ArticleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
