import { createSelector } from '@ngrx/store';
import { State } from '@app/reducers';

export const $selectAuth = (state: State) => state.auth;

export const $selectAuthToken = createSelector(
  $selectAuth,
  ({ auth }) => auth,
);

export const $selectUserInfo = createSelector(
  $selectAuth,
  ({ credentials }) => credentials,
);

export const $isLoggedIn = createSelector(
  $selectAuth,
  ({ login }) => login,
);
