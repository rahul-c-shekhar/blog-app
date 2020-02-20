import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Post } from "../_models/post";

@Injectable({ providedIn: "root" })
export class PostService {
  private baseURL = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Post[]>(this.baseURL + `/posts/`);
  }

  getByUserId(id: string) {
    // console.log("in service.ts:", id);
    return this.http.get(this.baseURL + `/posts/user/${id}`);
  }

  getById(id: string) {
    return this.http.get(this.baseURL + `/posts/${id}`);
  }

  create(post: any) {
    return this.http.post(this.baseURL + `/posts/create`, post);
  }

  updateViewCount(id: any, views) {
    // console.log("id:", id);
    // console.log("in service.ts views:", views);
    return this.http.put(this.baseURL + `/posts/v`, { id, views });
  }

  updateCommentsCount(id: any, comments: Number) {
    // console.log("id:", id);
    // console.log("in service.ts comments:", comments);

    // let header = new HttpHeaders();
    // header = header.set("Access-Control-Allow-Origin", "*");
    // let options = { headers: header };
    return this.http.put(this.baseURL + `/posts/c`, { id, comments });
    // return this.http.get("https://google.com");
  }

  update(post: any, postID: any) {
    return this.http.put(this.baseURL + `/posts/${postID}`, post);
  }

  delete(id: string) {
    return this.http.delete(this.baseURL + `/posts/${id}`);
  }
}
