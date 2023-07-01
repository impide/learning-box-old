import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ISignup } from '../../../interfaces';
import { AuthFeatureStoreActions, AuthFeatureStoreState } from '../../../store';
import { Role } from '../../../enums/roles';
import { pseudoValidators, emailValidators, passwordValidators, keyForms } from '../../../utils/errors-manager';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public mainForm: FormGroup;

  constructor(private store: Store<AuthFeatureStoreState.AuthState>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.mainForm = new FormGroup({
      pseudo: new FormControl('', pseudoValidators),
      email: new FormControl('', emailValidators),
      password: new FormControl('', passwordValidators),
      passwordConfirm: new FormControl('', passwordValidators),
    });
  }

  getControls(controlName: keyForms): string {
    return this.mainForm.controls[controlName].value;
  }

  onSignup(): void {
    if (this.mainForm.status !== 'VALID') return;
    const formValues = {
      email: this.getControls('email'),
      pseudo: this.getControls('pseudo'),
      password: this.getControls('password'),
      avatarUrl: 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80',
      role: Role.USER
    }
    const userSignup: ISignup = formValues;
    this.store.dispatch(new AuthFeatureStoreActions.SignUp(userSignup));
  }

}
