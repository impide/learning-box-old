import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, filter, skipWhile } from 'rxjs';
import { ProfileSectionsData } from '../../core';
import { IUser } from '../../interfaces';
import { AuthFeatureStoreSelectors, AuthFeatureStoreState } from '../../store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-profile',
  templateUrl: './sidebar-profile.component.html',
  styleUrls: ['./sidebar-profile.component.scss']
})
export class SidebarProfileComponent implements OnInit {
  currentUser$: Observable<IUser>;
  profileSectionsData: ProfileSectionsData[] = ProfileSectionsData;

  constructor(
    private store: Store<AuthFeatureStoreState.AuthState>,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.store.pipe(
      select(AuthFeatureStoreSelectors.selectUser),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    );
  }
}
