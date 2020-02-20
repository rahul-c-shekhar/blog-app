import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class CommentService {
  private baseURL = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  create(comment: any) {
    return this.http.post(this.baseURL + `/comments/create`, comment);
  }

  getAll() {
    return this.http.get(this.baseURL + `/comments/`);
  }

  getById(id: any) {
    return this.http.get(this.baseURL + `/comments/${id}`);
  }

  getByPostId(id: any) {
    // console.log("in service.ts");
    return this.http.get(this.baseURL + `/comments/post/${id}`);
  }

  getByUserId(id: any) {
    return this.http.get(this.baseURL + `/comments/user/${id}`);
  }

  update(id: any, userParam: any) {
    return this.http.put(this.baseURL + `/comments/${id}`, userParam);
  }

  delete(id: any) {
    return this.http.delete(this.baseURL + `/comments/${id}`);
  }
}
