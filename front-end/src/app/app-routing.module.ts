import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './pages/layouts/authentification/authentification.component';
import { CatalogComponent } from './pages/layouts/catalog/catalog.component';
import { CourseComponent } from './pages/layouts/course/course.component';

const routes: Routes = [
  { path: '', redirectTo: 'authentification', pathMatch: 'full' },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/course/:courseId/title/:courseTitle', component: CourseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
