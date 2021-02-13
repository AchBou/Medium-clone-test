import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../../services/comments/comment.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() articleId: number;

  comments: Comment[];

  commentFC = new FormControl('');

  constructor(public commentService: CommentService) { }

  ngOnInit(): void {
    this.refreshComments();
  }

  refreshComments(): void{
    this.commentService.getComments(this.articleId).subscribe((res => {
      this.comments = res;
    }), (error) => {
      console.log(error);
    });
  }

  submit(): void{
    const content = this.commentFC.value;
    if (content){
      console.log(this.articleId);
      this.commentService.addComment(content, this.articleId).subscribe(res => {
        console.log(res);
        this.refreshComments();
      });
    }
  }

}
