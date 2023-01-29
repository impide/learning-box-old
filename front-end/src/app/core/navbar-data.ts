export const NavbarData: NavbarData[] = [
  {
    routeName: 'Catalog',
    routePath: '/catalog',
    disabled: false
  },
  {
    routeName: '|',
    disabled: true
  },
  {
    routeName: 'Categories',
    routePath: '',
    disabled: false
  },
  {
    routeName: '|',
    disabled: true
  },
  {
    routeName: 'Formateur',
    routePath: '',
    disabled: false
  },
];

export interface NavbarData {
  routeName: string;
  routePath?: string;
  disabled: boolean;
};
