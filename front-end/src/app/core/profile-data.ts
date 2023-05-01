type MenuData = 'Se connecter' | 'S\'inscrire' | 'Mon profil' | 'Se déconnecter';
type MethodMenuData = 'login' | 'signup' | 'profile' | 'logout';

export const ProfileMenuDataOff: ProfileMenuData[] = [
  {
    textValue: 'Se connecter',
    methodValue: 'login'
  },
  {
    textValue: 'S\'inscrire',
    methodValue: 'signup'
  },
];

export const ProfileMenuDataOn: ProfileMenuData[] = [
  {
    textValue: 'Mon profil',
    methodValue: 'profile'
  },
  {
    textValue: 'Se déconnecter',
    methodValue: 'logout'
  },
];

export interface ProfileMenuData {
  textValue: MenuData;
  methodValue: MethodMenuData
}
