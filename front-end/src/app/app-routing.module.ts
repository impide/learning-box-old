import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CourseComponent } from './pages/course/course.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TabsProfileComponent } from './components/tabs-profile/tabs-profile.component';
import { CoursesCardsProfileComponent } from './components/courses-cards-profile/courses-cards-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'authentification', pathMatch: 'full' },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/course/:courseId/title/:courseTitle', component: CourseComponent },
  // My Profile
  {
    path: 'profile', component: ProfileComponent, children: [
      {
        path: 'my-courses', component: TabsProfileComponent, children: [
          { path: 'all', component: CoursesCardsProfileComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
