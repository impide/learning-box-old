import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable, skipWhile } from 'rxjs';
import { MaterialService } from '../../../utils/materials/material.service';
import { AuthFeatureStoreActions, AuthFeatureStoreSelectors, AuthFeatureStoreState } from '../../../store/auth-store/index';
import { RegisterAnimationService } from '../../../utils/animations/register-animation';
import { RegisterComponent } from '../register/register.component';
import { NavbarData } from '../../../core/navbar-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<boolean>;
  userEmail$: Observable<string>;

  navbarRoute: NavbarData[] = NavbarData;

  constructor(
    private router: Router,
    private materialService: MaterialService,
    private registerAnimation: RegisterAnimationService,
    private store: Store<AuthFeatureStoreState.AuthState>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.pipe(
      select(AuthFeatureStoreSelectors.selectIsAuth),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    this.userEmail$ = this.store.pipe(
      select(AuthFeatureStoreSelectors.selectUserEmail),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )
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

  onCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  onLogout(): void {
    this.store.dispatch(new AuthFeatureStoreActions.Logout());
  }

}
