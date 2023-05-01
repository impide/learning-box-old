import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable, skipWhile, take } from 'rxjs';
import { ICourse } from 'src/app/interfaces';
import { CourseFeatureStoreState, CourseFeatureStoreSelectors, CourseFeatureStoreActions } from 'src/app/store';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  currentCourse$: Observable<ICourse>;
  courseId: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<CourseFeatureStoreState.CourseState>) { }

  ngOnInit(): void {
    this.getCourseId();
    this.store.dispatch(new CourseFeatureStoreActions.GetCourse(this.courseId));
    this.getCourse();

    this.currentCourse$.subscribe(console.log)
  }

  getCourseId(): void {
    this.route.paramMap.pipe(
      filter(id => !!id),
      map(params => params.get('courseId')),
      take(1)
    ).subscribe((params) => {
      this.courseId = (+params);
    });
  }

  getCourse(): void {
    this.currentCourse$ = this.store
      .pipe(
        select(CourseFeatureStoreSelectors.selectCourse),
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
