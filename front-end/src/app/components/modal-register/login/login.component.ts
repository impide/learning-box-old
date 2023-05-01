import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthFeatureStoreActions, AuthFeatureStoreState } from '../../../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private store: Store<AuthFeatureStoreState.AuthState>) { }

  onLogin(form: NgForm): void {
    this.store.dispatch(new AuthFeatureStoreActions.Login(form.value));
  }

}
