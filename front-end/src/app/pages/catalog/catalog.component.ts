import { Component } from '@angular/core';
import { CategoriesData } from '../../core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  categories: CategoriesData[] = CategoriesData;
}
