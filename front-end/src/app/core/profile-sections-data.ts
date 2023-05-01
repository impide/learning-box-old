type ProfileSections = 'Mes cours' | 'Notifications' | 'Paramètre' | 'Aide';
type ProfileTabs = 'Cours' | 'Favoris' | 'Suggestions';
type ProfileRoutePath = 'my-courses/all'

export const ProfileSectionsData: ProfileSectionsData[] = [
  {
    icon: 'bi bi-book',
    textvalue: 'Mes cours',
    routePath: 'my-courses/all'
  },
  {
    icon: 'bi bi-bell',
    textvalue: 'Notifications'
  },
  {
    icon: 'bi bi-gear',
    textvalue: 'Paramètre'
  },
  {
    icon: 'bi bi-question-circle',
    textvalue: 'Aide'
  },
];

export const ProfileTabsData: ProfileTabsData[] = [
  {
    tabValue: 'Cours'
  },
  {
    tabValue: 'Favoris'
  },
  {
    tabValue: 'Suggestions'
  }
]

export interface ProfileSectionsData {
  icon: string;
  textvalue: ProfileSections;
  routePath?: ProfileRoutePath;
}

export interface ProfileTabsData {
  tabValue: ProfileTabs;
}
