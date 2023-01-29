import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthentificationComponent } from './authentification/authentification.component';
import { RegisterComponent } from '../components/register/register.component';
import { SignupComponent } from '../components/register/signup/signup.component';
import { LoginComponent } from '../components/register/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CatalogComponent } from './catalog/catalog.component';

@NgModule({
  declarations: [
    AuthentificationComponent,
    RegisterComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    CatalogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    AuthentificationComponent,
    RegisterComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent
  ]
})
export class LayoutModule {}
