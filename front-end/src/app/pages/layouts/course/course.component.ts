import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable, skipWhile, take } from 'rxjs';
import { Course } from '../../../interfaces';
import { CourseFeatureStoreState, CourseFeatureStoreSelectors, CourseFeatureStoreActions } from '../../../store/index';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  currentCourse$: Observable<Course>;
  courseId: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<CourseFeatureStoreState.CourseState>) {}

  ngOnInit(): void {
    this.store.dispatch(new CourseFeatureStoreActions.GetCourse());

    // Get Url Course
    this.route.paramMap
    .pipe(
      filter(id => !!id),
      map(params => params.get('courseId')),
      take(1)
      )
    .subscribe((params) => {
      this.courseId = (+params - 1);
    });

    // Get Course
    this.currentCourse$ = this.store
    .pipe(
      select(CourseFeatureStoreSelectors.selectCurrentCourse(this.courseId)),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    );
  }


  contents: Content[] = [
    {
      title: 'Définissez un emploi du temps précis et respectez-le',
      description: 'Ce n’est pas parce que vous n’avez pas de date et d’horaires imposés que vous devez reléguer votre formation à un niveau moins...'
    },
    {
      title: 'Définissez un emploi du temps précis et respectez-le',
      description: 'Ce n’est pas parce que vous n’avez pas de date et d’horaires imposés que vous devez reléguer votre formation à un niveau moins...'
    },
    {
      title: 'Définissez un emploi du temps précis et respectez-le',
      description: 'Ce n’est pas parce que vous n’avez pas de date et d’horaires imposés que vous devez reléguer votre formation à un niveau moins...'
    },
  ]
}

export interface Content {
  title: string;
  description: string;
}
