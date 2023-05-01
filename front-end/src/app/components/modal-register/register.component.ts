import { Component } from '@angular/core';
import { RegisterAnimation, RegisterAnimationService } from '../../utils/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [RegisterAnimation],
})
export class RegisterComponent {

  constructor(public registerAnimation: RegisterAnimationService) { }

  toLogin(): void {
    this.registerAnimation.toLoginForm()
  }

  toSignup(): void {
    this.registerAnimation.toSignupForm();
  }

}
