import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { AuthFeatureStoreSelectors, AuthFeatureStoreState } from 'src/app/store';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<AuthFeatureStoreState.AuthState>
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(pipe(AuthFeatureStoreSelectors.selectIsAuth));
  }

}
