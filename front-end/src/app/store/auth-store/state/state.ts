import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { IUser, IUserData } from './interface';

export interface AuthState extends EntityState<IUserData> {
  currentUser: IUser | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

export const authAdapter: EntityAdapter<IUserData> = createEntityAdapter<IUserData>({
  selectId: (iUserData: IUserData) => iUserData.result.id
});

const defaultAuth = {
  currentUser: null,
  isAuth: false,
  loading: false,
  error: null,
};

export const initialAuthState: AuthState = authAdapter.getInitialState(defaultAuth);
