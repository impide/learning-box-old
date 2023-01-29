import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthFeatureStoreActions, AuthFeatureStoreState } from './store/auth-store/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'learning-box-project';

  constructor(
    private store: Store<AuthFeatureStoreState.AuthState>
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.store.dispatch(new AuthFeatureStoreActions.AutoLogin());
    }
  }
}
