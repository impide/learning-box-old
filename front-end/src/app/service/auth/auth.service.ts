/* eslint-disable no-undef */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  BASE_API = environment.api;

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<User> {
    console.log("SERVICE : ", user);
    return this.http.post<User>(`${this.BASE_API}/users/signup`, user);
  }
}
