import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./_components/home/home.component";
import { AuthGuard } from "./_guards/auth.guard";
import { PostsComponent } from "./_components/posts/posts.component";
import { MypostsComponent } from "./_components/posts/myposts/myposts.component";
import { ViewPostComponent } from "./_components/posts/view-post/view-post.component";
import { CommentsComponent } from "./_components/comments/comments.component";
import { StatsComponent } from "./_components/stats/stats.component";
import { IndexPageComponent } from "./_components/index-page/index-page.component";

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "create", component: PostsComponent, canActivate: [AuthGuard] },
  {
    path: "updatePost/:postId",
    component: PostsComponent,
    canActivate: [AuthGuard]
  },
  { path: "myPosts", component: MypostsComponent, canActivate: [AuthGuard] },
  {
    path: "viewPost/:postId",
    component: ViewPostComponent,
    canActivate: [AuthGuard]
  },
  { path: "comments", component: CommentsComponent, canActivate: [AuthGuard] },
  { path: "stats", component: StatsComponent, canActivate: [AuthGuard] },
  { path: "", component: IndexPageComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
