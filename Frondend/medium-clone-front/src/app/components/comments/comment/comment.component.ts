import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Comment} from '../../../models/comment.interface';
import {MatDialog} from '@angular/material/dialog';
import {CommentService} from '../../../services/api/comments/comment.service';
import {CommentDialogComponent} from './comment-dialog/comment.dialog';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  name;
  animal;
  @Output() commentEvent = new EventEmitter<void>();

  constructor(public dialog: MatDialog,
              public commentService: CommentService) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {width: '500px', data: this.comment});

    dialogRef.afterClosed().subscribe(result => {
      this.commentEvent.emit();
    });
  }

  delete(): void {
    this.commentService.removeComment(this.comment.id).subscribe(res => {
      this.commentEvent.emit();
    });
  }
}
