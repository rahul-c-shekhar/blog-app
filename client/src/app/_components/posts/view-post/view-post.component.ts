import { Component, OnInit } from "@angular/core";
import { PostService } from "@/_services/post.service";
import { ActivatedRoute } from "@angular/router";
import { CommentService } from "@/_services/comment.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Comment } from "../../../_models/comment";

@Component({
  selector: "app-view-post",
  templateUrl: "./view-post.component.html",
  styleUrls: ["./view-post.component.css"]
})
export class ViewPostComponent implements OnInit {
  post: any;
  comments: any;
  user: any;
  userID: any;
  updateComment: any;
  count = 0;

  commentForm: FormGroup;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private _fb: FormBuilder,
    private id: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postService.getById(this.id.snapshot.params.postId).subscribe(data => {
      this.post = data[0];
      // console.log("data:", data[0]);

      // console.log("id:", this.id.snapshot.params.postId);
      // console.log("views:", data[0].views);

      let viewCount = data[0].views;

      if (viewCount == null) {
        viewCount = 0;
      }

      if (!(this.userID == data[0].userID)) {
        this.postService
          .updateViewCount(this.id.snapshot.params.postId, viewCount + 1)
          .subscribe(() => {});
      }
    });

    this.commentForm = this._fb.group({
      comment: ["", [Validators.required]]
    });

    this.userID = JSON.parse(localStorage.getItem("currentUser"))._id;
    this.user =
      JSON.parse(localStorage.getItem("currentUser")).firstName +
      " " +
      JSON.parse(localStorage.getItem("currentUser")).lastName;

    this.commentService.getAll().subscribe(data => {
      this.comments = data;

      this.comments.forEach(i => {
        if (this.id.snapshot.params.postId == i.postID) {
          this.count++;
        }
      });

      this.postService
        .updateCommentsCount(this.id.snapshot.params.postId, this.count)
        .subscribe(data => {
          // console.log(data);
        });
      //  console.log("Data:", Object.keys(data).length);
    });

    this.commentForm = this._fb.group({
      comment: ["", [Validators.required]]
    });

    // console.log("Count:", this.count);
    // this.getCommentCount();
  }

  get comment() {
    return this.commentForm.get("comment");
  }

  commentHandler(title, postID) {
    const comment = new Comment();
    comment.comment = this.comment.value;
    comment.postTitle = title;
    comment.userID = this.userID;
    comment.postID = postID;
    comment.user = this.user;
    this.commentService.create(comment).subscribe(res => {
      // console.log(res);
    });

    location.reload();
  }

  updateCommentHandler(id) {
    let comment;
    this.commentService.getById(id).subscribe(result => {
      this.updateComment = result;
    });

    setTimeout(() => {
      this.comment.setValue(this.updateComment.comment);
    }, 1000);

    comment = this.comment.value;
    this.commentService.update(id, comment).subscribe(() => {
      this.ngOnInit();
      this.comments = null;
    });
  }

  deleteCommentHandler(id) {
    this.commentService.delete(id).subscribe(() => this.ngOnInit());
  }

  // getCommentCount() {
  //   for (let i = 0; i < Object.keys(this.comments).length; i++) {
  //     console.log(i);
  //     if (this.id.snapshot.params.postId == this.comments[i].postID) {
  //       this.count++;
  //     }
  //   }
  // }

  // updateCommentCount() {

  // }
}
