import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { RegisterComponent } from './components/authentification/register/register.component';
import { SignupComponent } from './components/authentification/register/signup/signup.component';
import { LoginComponent } from './components/authentification/register/login/login.component';
import { NavbarComponent } from './layout/ui/navbar/navbar.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effect';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    RegisterComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forRoot({ auth: authReducer }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 5 })
      : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
