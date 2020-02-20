import { Component, OnInit } from "@angular/core";
import { PostService } from "@/_services/post.service";
import { Router } from "@angular/router";
import { CommentService } from "@/_services/comment.service";
import { Chart } from "angular-highcharts";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.css"]
})
export class StatsComponent implements OnInit {
  posts: any;
  user: any;
  userID: any;
  comments: any;
  titleData = [] as any;
  commentsData = [] as any;
  viewsData = [] as any;
  chart: any;

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

    this.postService.getByUserId(this.userID).subscribe(data => {
      this.posts = data;

      for (let i = 0; i < this.posts.length; i++) {
        let comments = this.posts[i].comments;
        let title = this.posts[i].title;
        let views = this.posts[i].views;

        this.titleData.push(title);
        this.commentsData.push(comments);
        this.viewsData.push(views);
      }

      this.chart = new Chart({
        chart: {
          type: "line"
        },
        title: {
          text: "Posts Stats"
          // floating: true
        },
        legend: { align: "right", verticalAlign: "top", floating: true },
        yAxis: {
          title: {
            text: "Views and Comments"
          }
        },
        xAxis: {
          title: {
            text: "Post titles"
          },
          categories: this.titleData
        },
        series: [
          {
            name: "Views",
            data: this.viewsData
          },
          {
            name: "Comments",
            data: this.commentsData
          }
        ]
      } as any);

      // console.log("title data:", this.titleData);
      // console.log("comments data:", this.commentsData);
      // console.log("views data:", this.viewsData);

      // console.log("Posts:", this.posts[0]);
      // console.log("Data: ", this.data)
    });

    this.commentService.getAll().subscribe(data => (this.comments = data));
  }

  // viewPostHandler(id) {
  //   this.router.navigate(["viewPost/", id]);
  // }
}
