/* eslint-disable no-undef */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, ISignup } from '../../../interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  BASE_API = environment.api;

  constructor(
    private http: HttpClient,
  ) { }

  signup(user: ISignup): Observable<ISignup> {
    return this.http.post<ISignup>(`${this.BASE_API}/users/signup`, user);
  }

  login(user: ILogin): Observable<ILogin> {
    return this.http.post<ILogin>(`${this.BASE_API}/users/login`, user);
  }

}
