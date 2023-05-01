/* eslint-disable no-undef */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseService {
  BASE_API = environment.api;

  constructor(
    private http: HttpClient,
  ) { }

  getAllCourses(): Observable<{}> {
    return this.http.get<{}>(`${this.BASE_API}/courses/`);
  }

  getOneCourse(id: number): Observable<{}> {
    return this.http.get<{}>(`${this.BASE_API}/courses/${id}`);
  }

}
