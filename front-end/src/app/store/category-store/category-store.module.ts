import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoryEffects } from './state/effect';
import { categoryReducer } from './state/reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('category', categoryReducer),
    EffectsModule.forFeature([CategoryEffects])
  ]
})
export class CategoryStoreModule { }
