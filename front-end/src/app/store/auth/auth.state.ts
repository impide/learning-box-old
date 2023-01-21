import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from 'src/app/model/user/user.model';
import { UserLogin } from 'src/app/model/user/userLogin.model';
import { UserSignup } from 'src/app/model/user/userSignup.model';

export interface AuthState extends EntityState<User> {
  currentUser: User | any | null;
  loading: boolean;
  error: string | null;
}

export interface SignupState extends EntityState<UserSignup> {
  loading: boolean;
  error: string | null;
}

export interface LoginState extends EntityState<UserLogin> {
  loading: boolean;
  error: string | null;
}

export const authAdapter: EntityAdapter<User> = createEntityAdapter<User>();
export const signupAdapter: EntityAdapter<UserSignup> = createEntityAdapter<UserSignup>();
export const loginAdapter: EntityAdapter<UserLogin> = createEntityAdapter<UserLogin>();

const defaultUser = {
  currentUser: null,
  loading: false,
  error: null,
};

export const initialAuthState: AuthState = authAdapter.getInitialState(defaultUser);
export const initialSignupState: SignupState = signupAdapter.getInitialState(defaultUser);
export const initialLoginState: LoginState = loginAdapter.getInitialState(defaultUser);
