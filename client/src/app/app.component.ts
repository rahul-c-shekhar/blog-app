import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "./_services/authentication.service";
import { User } from "./_models/user";

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent {
  currentUser: User;

  userID: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.userID = JSON.parse(localStorage.getItem("currentUser"))._id;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
