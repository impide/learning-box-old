import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { MaterialService } from '../../../utils/materials/material.service';
import { AuthFeatureStoreSelectors, AuthFeatureStoreState } from '../../../store/auth-store/index';
import { RegisterAnimationService } from '../../../utils/animations/register-animation';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(
    private materialService: MaterialService,
    private registerAnimation: RegisterAnimationService,
    private store: Store<AuthFeatureStoreState.AuthState>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(pipe(AuthFeatureStoreSelectors.selectIsAuth));
  }

  onAuth(value: string): void {
    if (value === 'login') {
      this.registerAnimation.toLoginForm();
    } else {
      this.registerAnimation.toSignupForm();
    }

    this.materialService.openDialog(
      RegisterComponent,
      {
        panelClass: [
          'col-12',
          'col-sm-8',
          'col-md-6',
          'col-lg-5',
          'col-xl-4',
          'col-xxl-4',
          'animate__animated',
          'animate__slideInUp',
          'custom-modal'
        ],
        autoFocus: false
      }
    );
  }

}
