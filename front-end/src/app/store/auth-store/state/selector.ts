import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntitySelectors, EntityState } from '@ngrx/entity/src/models';
import { authAdapter, AuthState } from './state';
import { IUserData } from './interface';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const {
  selectAll: selectAllUsers,
}: EntitySelectors<IUserData, EntityState<IUserData>> = authAdapter.getSelectors();

export const currentUser = (state: AuthState) => state.currentUser;
export const userPseudo = (state: AuthState) => state.currentUser?.pseudo;
export const userEmail = (state: AuthState) => state.currentUser?.email;
export const userAvatarUrl = (state: AuthState) => state.currentUser?.avatarUrl;
export const isAuth = (state: AuthState) => state.isAuth;
export const loading = (state: AuthState) => state.loading;
export const error = (state: AuthState) => state.error;

export const selectUsers = createSelector(getAuthState, selectAllUsers);
export const selectUser = createSelector(getAuthState, currentUser);
export const selectUserPseudo = createSelector(getAuthState, userPseudo);
export const selectUserEmail = createSelector(getAuthState, userEmail);
export const selectUserAvatarUrl = createSelector(getAuthState, userAvatarUrl);
export const selectIsAuth = createSelector(getAuthState, isAuth);
export const selectLoading = createSelector(getAuthState, loading);
export const selectError = createSelector(getAuthState, error);
