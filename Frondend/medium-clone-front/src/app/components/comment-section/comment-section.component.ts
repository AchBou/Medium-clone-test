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

  isLoading = true;
  content: string;

  constructor(public commentService: CommentService) { }

  ngOnInit(): void {
    this.refreshComments();
  }

  refreshComments(): void{
    this.commentService.getComments(this.articleId).subscribe((res => {
      this.isLoading = false;
      this.comments = res;
    }), (error) => {
      console.log(error);
    });
  }

  submit(): void{
    if (this.content){
      this.commentService.addComment(this.content, this.articleId).subscribe(res => {
        console.log(res);
        this.refreshComments();
        this.content = '';
      });
    }
  }

}
