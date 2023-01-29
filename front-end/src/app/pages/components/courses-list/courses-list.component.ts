import { Component } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  // Fake Data (to Delete)
  categories = [
    { name: 'Ressources humaines'},
    { name: 'Gestion de projet'},
    { name: 'Gestion de conflits'},
  ];

  courses = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
  ];
}
