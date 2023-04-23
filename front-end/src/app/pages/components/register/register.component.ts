import { Component, OnInit } from '@angular/core';
import { RegisterAnimation, RegisterAnimationService } from '../../../utils/animations/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [RegisterAnimation],
})
export class RegisterComponent implements OnInit {

  constructor(public registerAnimation: RegisterAnimationService) { }

  ngOnInit(): void {
  }

  toLogin(): void {
    this.registerAnimation.toLoginForm()
  }

  toSignup(): void {
    this.registerAnimation.toSignupForm();
  }

}
