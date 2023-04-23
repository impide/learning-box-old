import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignupModel } from '../../../../models/index';
import { AuthFeatureStoreActions, AuthFeatureStoreState } from '../../../../store/auth-store/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private store : Store<AuthFeatureStoreState.AuthState>) {}

  ngOnInit(): void {}

  onSignup(form: NgForm): void {
    const { pseudo, email, password } = form.value;
    const avatar = '../../../../assets/img/avatar.avif';
    const role = 0;

    const userSignup: SignupModel = { pseudo, email, password, avatar, role };
    this.store.dispatch(new AuthFeatureStoreActions.SignUp(userSignup));
  }

}
