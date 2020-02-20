import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "@/_services/authentication.service";
import { PostService } from "@/_services/post.service";
import { UserService } from "@/_services/user.service";
import { User } from "@/_models/user";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-myposts",
  templateUrl: "./myposts.component.html",
  styleUrls: ["./myposts.component.css"]
})
export class MypostsComponent implements OnInit {
  posts: any;
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  userID: any;
  user: any;

  constructor(
    private authenticationService: AuthenticationService,
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {
    this.userID = JSON.parse(localStorage.getItem("currentUser"))._id;
    this.user =
      JSON.parse(localStorage.getItem("currentUser")).firstName +
      JSON.parse(localStorage.getItem("currentUser")).lastName;

    this.postService
      .getByUserId(this.userID)
      .subscribe(data => (this.posts = data));
  }

  updateHandler(pid) {
    // console.log(this.posts);
    this.router.navigate([`updatePost/${pid}`]);
  }

  deleteHandler(id) {
    this.postService.delete(id).subscribe(data => {
      var filteredPost = this.posts.filter(p => p._id !== id);
      this.posts = filteredPost;
    });
  }

  viewPostHandler(id) {
    this.router.navigate(["viewPost/", id]);
  }
}
