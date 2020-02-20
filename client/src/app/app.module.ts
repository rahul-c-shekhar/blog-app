import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AlertComponent } from "./_components/alert/alert.component";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { HomeComponent } from "./_components/home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PostsComponent } from "./_components/posts/posts.component";
import { MypostsComponent } from "./_components/posts/myposts/myposts.component";
import { ViewPostComponent } from "./_components/posts/view-post/view-post.component";
import { StatsComponent } from "./_components/stats/stats.component";
import { ChartModule } from "angular-highcharts";
import { CommentsComponent } from "./_components/comments/comments.component";
import { IndexPageComponent } from './_components/index-page/index-page.component';

// import { ResizableModule } from "angular-resizable-element";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    BrowserAnimationsModule
    // ResizableModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    MypostsComponent,
    ViewPostComponent,
    StatsComponent,
    CommentsComponent,
    IndexPageComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
