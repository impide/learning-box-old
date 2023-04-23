import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable, skipWhile } from 'rxjs';
import { Course } from '../../../interfaces';
import { CourseFeatureStoreState, CourseFeatureStoreSelectors, CourseFeatureStoreActions } from '../../../store/index';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  categories$: Observable<Set<string>>;
  coursesByCategory$: Observable<Array<Course[]>>;

  constructor(
    private store: Store<CourseFeatureStoreState.CourseState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new CourseFeatureStoreActions.GetCourse());

    this.categories$ = this.store.pipe(
      select(CourseFeatureStoreSelectors.selectCategories),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    );

    this.coursesByCategory$ = this.store.pipe(
      select(CourseFeatureStoreSelectors.selectCoursesByCategory),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    );
  }

  navigateToCourse(course: Course): void {
    const { id, label } = course;
    this.router.navigate([`catalog/course/${id}/title/${label}`]);
  }
}
