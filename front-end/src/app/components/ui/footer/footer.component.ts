import { Component } from '@angular/core';
import { FooterData, FooterData_A, FooterData_B } from '../../../core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Temporary
  footerData_A: FooterData[] = FooterData_A;
  footerData_B: FooterData[] = FooterData_B;
}
