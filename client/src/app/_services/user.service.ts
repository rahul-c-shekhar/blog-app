import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../_models/user";

@Injectable({ providedIn: "root" })
export class UserService {
  private baseURL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(this.baseURL + `/users`);
  }

  getById(id: number) {
    return this.http.get(this.baseURL + `/users/${id}`);
  }

  register(user: User) {
    return this.http.post(this.baseURL + `/users/register`, user);
  }

  update(user: User) {
    return this.http.put(this.baseURL + `/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(this.baseURL + `/users/${id}`);
  }
}
