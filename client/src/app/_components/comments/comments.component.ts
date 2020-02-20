import { Component, OnInit } from "@angular/core";
import { PostService } from "@/_services/post.service";
import { Router } from "@angular/router";
import { CommentService } from "@/_services/comment.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  posts: any;
  user: any;
  userID: any;
  comments: any;
  count = 0;

  constructor(
    private postService: PostService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.userID = JSON.parse(localStorage.getItem("currentUser"))._id;
    // console.log("userID:", this.userID);
    this.user =
      JSON.parse(localStorage.getItem("currentUser")).firstName +
      " " +
      JSON.parse(localStorage.getItem("currentUser")).lastName;
    // console.log(this.user);
    // console.log(this.userID, this.user);

    this.postService
      .getByUserId(this.userID)
      .subscribe(data => {
        this.posts = data
      
        

      })

      this.commentService.getAll().subscribe(data => (this.comments = data));

    

  }

  viewPostHandler(id) {
    this.router.navigate(["viewPost/", id]);
  }

  deleteCommentHandler(id) {
    this.commentService.delete(id).subscribe(() => {
  })
}
}
