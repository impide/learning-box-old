import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, skipWhile } from 'rxjs';
import { ICategory, ICourse } from '../../interfaces';
import { CategoryFeatureStoreActions, CategoryFeatureStoreSelectors, CategoryFeatureStoreState } from 'src/app/store';

@Component({
  selector: 'app-courses-catalog-cards',
  templateUrl: './courses-cards-catalog.component.html',
  styleUrls: ['./courses-cards-catalog.component.scss']
})
export class CoursesCardsCatalogComponent implements OnInit {
  categoriesWithCourses$: Observable<ICategory[]>;

  constructor(
    private store: Store<CategoryFeatureStoreState.CategoryState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new CategoryFeatureStoreActions.GetCategoriesWithCourses());
    this.categoriesWithCourses$ = this.store.pipe(
      select(CategoryFeatureStoreSelectors.selectCategoriesWithCourses),
      skipWhile(val => val === null),
      filter(val => val !== undefined),
    );
  }

  navigateToCourse(course: ICourse): void {
    const { id, label } = course;
    this.router.navigate([`catalog/course/${id}/title/${label}`]);
  }
}
