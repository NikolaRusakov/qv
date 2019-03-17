import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromVote from '../features/vote/vote.reducer';
import * as fromAuth from '../features/auth/auth.reducer';

export interface State {
  votes: fromVote.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  votes: fromVote.reducer,
  auth: fromAuth.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectVoteState = createFeatureSelector<fromVote.State>('votes');

export const selectFeature = (state: State) => state.auth;

export const selectAuthToken = createSelector(
  selectFeature,
  ({ auth }) => auth,
);

export const selectVoteEntities = createSelector(
  selectVoteState,
  fromVote.selectEntities,
);
