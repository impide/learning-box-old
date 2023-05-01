import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthFeatureStoreActions, AuthFeatureStoreState } from './store/auth-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'learning-box-project';

  constructor(
    private store: Store<AuthFeatureStoreState.AuthState>
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('auth')) {
      this.store.dispatch(new AuthFeatureStoreActions.AutoLogin());
    }
  }
}
