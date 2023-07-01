import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from '../utils/materials/material.module';
import { DragScrollModule } from 'ngx-drag-scroll';

import { AuthentificationComponent } from './authentification/authentification.component';
import { RegisterComponent } from '../components/modal-register/register.component';
import { SignupComponent } from '../components/modal-register/signup/signup.component';
import { LoginComponent } from '../components/modal-register/login/login.component';
import { NavbarComponent } from '../components/ui/header/navbar.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CoursesCardsCatalogComponent } from '../components/courses-cards-catalog/courses-cards-catalog.component';
import { CourseCardComponent } from '../components/ui/course-card/course-card.component';
import { CourseComponent } from './course/course.component';
import { FooterComponent } from '../components/ui/footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarProfileComponent } from '../components/sidebar-profile/sidebar-profile.component';
import { TabsProfileComponent } from '../components/tabs-profile/tabs-profile.component';
import { CoursesCardsProfileComponent } from '../components/courses-cards-profile/courses-cards-profile.component';

@NgModule({
  declarations: [
    AuthentificationComponent,
    RegisterComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    CatalogComponent,
    CoursesCardsCatalogComponent,
    CourseCardComponent,
    CourseComponent,
    FooterComponent,
    ProfileComponent,
    SidebarProfileComponent,
    TabsProfileComponent,
    CoursesCardsProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    DragDropModule,
    MaterialModule,
    DragScrollModule
  ],
  exports: [
    AuthentificationComponent,
    RegisterComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    CatalogComponent,
    CoursesCardsCatalogComponent,
    CourseCardComponent,
    CourseComponent,
    FooterComponent,
    ProfileComponent,
    SidebarProfileComponent,
    TabsProfileComponent,
    CoursesCardsProfileComponent
  ]
})
export class PageModule { }
