import { Component } from '@angular/core';
import { ProfileTabsData } from '../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs-profile',
  templateUrl: './tabs-profile.component.html',
  styleUrls: ['./tabs-profile.component.scss']
})
export class TabsProfileComponent {
  profileTabs: ProfileTabsData[] = ProfileTabsData;

  constructor(public router: Router) { }
}
