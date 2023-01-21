/* eslint-disable no-undef */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin } from 'src/app/model/user/userLogin.model';
import { UserSignup } from 'src/app/model/user/userSignup.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  BASE_API = environment.api;

  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  signup(user: UserSignup): Observable<UserSignup> {
    return this.http.post<UserSignup>(`${this.BASE_API}/users/signup`, user);
  }

  login(user: UserLogin): Observable<UserLogin> {
    return this.http.post<UserSignup>(`${this.BASE_API}/users/login`, user);
  }

  initAuth(): void {
    if (typeof localStorage !== 'undefined') {
      console.log(localStorage);

      const data = JSON.parse(localStorage.getItem('auth'));
      if (data && data.idToken) {
        this.isAuth$.next(true);
      }
    }
  }

}
