import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthFeatureStoreActions, AuthFeatureStoreState } from '../../../../store/auth-store/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AuthFeatureStoreState.AuthState>) { }

  ngOnInit(): void {}

  onLogin(form: NgForm): void {
    this.store.dispatch(new AuthFeatureStoreActions.Login(form.value));
  }

}
