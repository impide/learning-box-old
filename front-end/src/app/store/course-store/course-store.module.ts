import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CourseEffects } from './state/effect';
import { courseReducer } from './state/reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('course', courseReducer),
    EffectsModule.forFeature([CourseEffects])
  ]
})
export class CourseStoreModule {}
