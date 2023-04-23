import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AuthentificationComponent } from './authentification/authentification.component';
import { RegisterComponent } from '../components/register/register.component';
import { SignupComponent } from '../components/register/signup/signup.component';
import { LoginComponent } from '../components/register/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CoursesListComponent } from '../components/courses-list/courses-list.component';
import { CourseCardComponent } from '../components/courses-list/course-card/course-card.component';
import { CourseComponent } from './course/course.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ParallaxComponent } from '../components/parallax/parallax.component';

import { ParallaxItemDirective } from '../../core/parallax-data';

@NgModule({
  declarations: [
    AuthentificationComponent,
    RegisterComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    CatalogComponent,
    CoursesListComponent,
    CourseCardComponent,
    CourseComponent,
    FooterComponent,
    ParallaxComponent,
    ParallaxItemDirective
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    DragDropModule
  ],
  exports: [
    AuthentificationComponent,
    RegisterComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    CatalogComponent,
    CoursesListComponent,
    CourseCardComponent,
    CourseComponent,
    FooterComponent,
    ParallaxComponent,
    ParallaxItemDirective
  ]
})
export class LayoutModule {}
