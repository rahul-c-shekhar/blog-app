import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "../../_services/authentication.service";
// import { UserService } from "../../_services/user.service";
import { PostService } from "../../_services/post.service";
import { Subscription } from "rxjs";
import { User } from "@/_models/user";
// import { first } from "rxjs/internal/operators/first";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  users: User[] = [];
  file: any;
  userID: any;
  post: any;
  user: any;
  postID: any;
  enable: any;

  postError = {
    isError: false,
    msg: ""
  };

  postCreationForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private _fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private id: ActivatedRoute
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
      " " +
      JSON.parse(localStorage.getItem("currentUser")).lastName;

    this.enable = this.id.snapshot.params.postId;

    if (this.enable) {
      this.getUpdatedPost();
    }

    this.postCreationForm = this._fb.group({
      title: ["", [Validators.required]],
      body: ["", [Validators.required]],
      imgURL: ["", [Validators.required]]
    });
  }

  onChange(event) {
    this.file = event.target.files[0];
  }

  get title() {
    return this.postCreationForm.get("title");
  }

  get body() {
    return this.postCreationForm.get("body");
  }

  createHandler() {
    const post = new FormData();

    post.append("title", this.title.value);
    post.append("imgURL", this.file);
    post.append("body", this.body.value);
    post.append("userID", this.userID);
    post.append("user", this.user);

    this.postService.create(post).subscribe(res => {
      // console.log(res);
      const result = res;
    });

    setTimeout(() => {
      this.router.navigate(["home"]);
    }, 1000);
  }

  getUpdatedPost() {
    // console.log("User id : ", this.userID);
    this.postService.getById(this.enable).subscribe(result => {
      // JSON.stringify(result);
      // console.log(result[0]._id);
      this.title.setValue(result[0].title);
      this.body.setValue(result[0].body);
      this.postID = result[0]._id;
    });
  }

  updateHandler() {
    const updatedPost = new FormData();

    updatedPost.append("_id", this.postID);
    updatedPost.append("title", this.title.value);
    updatedPost.append("imgURL", this.file);
    updatedPost.append("body", this.body.value);
    updatedPost.append("userID", this.userID);
    updatedPost.append("user", this.user);

    // console.log(updatedPost);
    this.postService
      .update(updatedPost, this.postID)
      .subscribe(data => console.log(data));

    this.router.navigate(["myPosts"]);
  }
}
