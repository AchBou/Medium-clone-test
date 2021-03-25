import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ArticleDialogComponent} from '../../../article/article-dialog/article.dialog';
import {CommentService} from '../../../../services/api/comments/comment.service';
import {Comment} from '../../../../models/comment.interface';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-comment-dialog',
  templateUrl: 'comment.dialog.html',
  styleUrls: ['comment.dialog.css']
  ,
})
export class CommentDialogComponent {

  content: string;

  constructor(public commentService: CommentService,
              public dialogRef: MatDialogRef<ArticleDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Comment) {
    this.content = this.data.content;
  }

  submit(): void{
    this.commentService.updateComment(this.data.id,  this.content).subscribe(res => {
      if (res.id) {
        this.dialogRef.close();
      }
    });
  }

}
