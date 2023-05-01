import { CommonModule } from '@angular/common';
import { isDevMode, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreModule } from './auth-store';
import { CourseStoreModule } from './course-store';
import { CategoryStoreModule } from './category-store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    AuthStoreModule,
    CourseStoreModule,
    CategoryStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ]
})
export class RootStateModule { }
