import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../interfaces';
import { Router } from '@angular/router';
import { CourseFeatureStoreActions, CourseFeatureStoreSelectors, CourseFeatureStoreState } from '../../store';
import { Store, select } from '@ngrx/store';
import { Observable, filter, skipWhile } from 'rxjs';

@Component({
  selector: 'app-courses-cards-profile',
  templateUrl: './courses-cards-profile.component.html',
  styleUrls: ['./courses-cards-profile.component.scss']
})
export class CoursesCardsProfileComponent implements OnInit {
  courses$: Observable<ICourse[]>;

  constructor(
    private store: Store<CourseFeatureStoreState.CourseState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new CourseFeatureStoreActions.GetCourses());
    this.courses$ = this.store.pipe(
      select(CourseFeatureStoreSelectors.selectCourses),
      skipWhile(val => val === null),
      filter(val => val !== undefined),
    );
  }

  navigateToCourse(course: ICourse): void {
    const { id, label } = course;
    this.router.navigate([`catalog/course/${id}/title/${label}`]);
  }
}
