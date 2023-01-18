import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm): void {
    const { pseudo, email, password } = form.value;
    const avatar = '../../../../assets/img/avatar.avif';
    const role = 0;

    const user = new User(pseudo, email, password, avatar, role);
  }

}
