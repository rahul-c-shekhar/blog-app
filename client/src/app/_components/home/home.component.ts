import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";

import { User } from "../../_models/user";
import { Post } from "../../_models/post";
import { AuthenticationService } from "../../_services/authentication.service";
import { UserService } from "../../_services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostService } from "../../_services/post.service";
import { CommentService } from "@/_services/comment.service";
import { Comment } from "../../_models/comment";
import { Router } from "@angular/router";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  posts: any;
  user: any;
  userID: any;
  comments: any;
  updateComment: any;

  commentForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private postService: PostService,
    private _fb: FormBuilder,
    private router: Router,
    private commentService: CommentService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {
    this.postService.getAll().subscribe(data => {
      this.posts = data;
    });

    this.userID = JSON.parse(localStorage.getItem("currentUser"))._id;
    this.user =
      JSON.parse(localStorage.getItem("currentUser")).firstName +
      " " +
      JSON.parse(localStorage.getItem("currentUser")).lastName;
    // console.log(this.user);
    // console.log(this.userID, this.user);

    this.commentForm = this._fb.group({
      comment: ["", [Validators.required]]
    });

    this.commentService.getAll().subscribe(data => (this.comments = data));
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

  viewPostHandler(id) {
    this.router.navigate(["/viewPost/", id]);
  }
}
