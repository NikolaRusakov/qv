import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoadAuth = '[Auth] Load Auth',
  SaveAuthToken = '[Auth] Save Auth Token',
}

export class LoadAuth implements Action {
  readonly type = AuthActionTypes.LoadAuth;
}

export class SaveAuthToken implements Action {
  readonly type = AuthActionTypes.SaveAuthToken;

  constructor(public readonly token: string) {}
}

export type AuthActions = LoadAuth | SaveAuthToken;
