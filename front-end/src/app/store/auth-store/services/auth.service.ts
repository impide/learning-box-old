/* eslint-disable no-undef */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel, SignupModel } from '../../../models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  BASE_API = environment.api;

  constructor(
    private http: HttpClient,
  ) { }

  signup(user: SignupModel): Observable<SignupModel> {
    return this.http.post<SignupModel>(`${this.BASE_API}/users/signup`, user);
  }

  login(user: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.BASE_API}/users/login`, user);
  }

}
