import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable, skipWhile } from 'rxjs';
import { Router } from '@angular/router';
import { MaterialService } from '../../../utils/materials/material.service';
import { AuthFeatureStoreActions, AuthFeatureStoreSelectors, AuthFeatureStoreState } from '../../../store';
import { RegisterAnimationService } from '../../../utils/animations';
import { RegisterComponent } from '../../modal-register/register.component';
import { NavbarData, ProfileMenuData, ProfileMenuDataOn, ProfileMenuDataOff } from '../../../core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<boolean>;
  userPseudo$: Observable<string>;
  userAvatarUrl$: Observable<string>;

  public navbarRoute: NavbarData[] = NavbarData;
  public profileDataOn: ProfileMenuData[] = ProfileMenuDataOn;
  public profileDataOff: ProfileMenuData[] = ProfileMenuDataOff;

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
    );

    this.userPseudo$ = this.store.pipe(
      select(AuthFeatureStoreSelectors.selectUserPseudo),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    );

    this.userAvatarUrl$ = this.store.pipe(
      select(AuthFeatureStoreSelectors.selectUserAvatarUrl),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    );
  }

  onSelectMenu(methodValue: string): void {
    switch (methodValue) {
      case 'login':
        this.registerAnimation.toLoginForm();
        this.openModal();
        break;
      case 'signup':
        this.registerAnimation.toSignupForm();
        this.openModal();
        break;
      case 'logout':
        this.store.dispatch(new AuthFeatureStoreActions.Logout());
        break;
      case 'profile':
        this.router.navigate(['/profile/my-courses/all']);
        break;
      default:
        break;
    }
  }

  onCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  openModal(): void {
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
