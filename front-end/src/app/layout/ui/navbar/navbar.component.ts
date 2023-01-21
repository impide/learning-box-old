import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegisterComponent } from 'src/app/components/authentification/register/register.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AuthFeatureStoreSelectors, AuthFeatureStoreState } from 'src/app/store/auth/auth.index';
import { RegisterAnimationService } from '../../material/animation/register-animation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    public registerAnimation: RegisterAnimationService,
    private authService: AuthService,
    private store: Store<AuthFeatureStoreState.AuthState>) { }

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
  }

  onAuth(value: string): void {
    if (value === 'login') {
      this.registerAnimation.toLoginForm();
    } else {
      this.registerAnimation.toSignupForm();
    }

    this.dialog.open(RegisterComponent, {
      panelClass: [
        'col-12',
        'col-sm-8',
        'col-md-6',
        'col-lg-5',
        'col-xl-4',
        'col-xxl-4',
        'animate__animated',
        'animate__slideInUp',
      ],
      autoFocus: false
    });
  }

}
