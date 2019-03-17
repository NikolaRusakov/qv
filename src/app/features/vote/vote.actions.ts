import { Action } from '@ngrx/store';
import { Vote } from './vote-models';

export enum VoteActionTypes {
  LoadVotes = '[Vote Load] Load Votes',
  GetVoteById = '[Vote Get By Id] Get Vote By ID',
  SaveVotes = '[Vote Save] Save Votes',
  ChangeVotes = '[Vote Change] Change Votes',
}

export class LoadVotes implements Action {
  readonly type = VoteActionTypes.LoadVotes;
}

export class ChangeVotes implements Action {
  readonly type = VoteActionTypes.ChangeVotes;

  constructor(public payload: Vote[]) {}
}

export class SaveVotes implements Action {
  readonly type = VoteActionTypes.SaveVotes;

  constructor(public payload: Vote[]) {}
}

export class GetVoteById implements Action {
  readonly type = VoteActionTypes.GetVoteById;

  constructor(public id: string) {}
}

export type VoteActions = LoadVotes | SaveVotes | GetVoteById | ChangeVotes;
