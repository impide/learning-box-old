import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/components/authentification/register/register.component';
import { RegisterAnimationService } from '../../material/animation/register-animation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public registerAnimation: RegisterAnimationService) { }

  ngOnInit(): void {
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
