import { Action } from '@ngrx/store';
import { UserInfo } from 'firebase';

export enum AuthActionTypes {
  LoadAuth = '[Auth] Load Auth',
  GetUserInfo = '[Auth User Get] User Info',
  SaveAuthToken = '[Auth Save] Save Auth Token',
  LoginWithAuthToken = '[Auth Login] Login With Auth Token',
  SaveAuthCredentials = '[Auth Save Credentials] Save Auth Credentials',
}

export class LoadAuth implements Action {
  readonly type = AuthActionTypes.LoadAuth;
}

export class SaveAuthToken implements Action {
  readonly type = AuthActionTypes.SaveAuthToken;

  constructor(public readonly token: string) {
  }
}

export class LoginWithAuthToken implements Action {
  readonly type = AuthActionTypes.LoginWithAuthToken;

  constructor(public readonly token: string) {
  }
}

export class SaveAuthCredentials implements Action {
  readonly type = AuthActionTypes.SaveAuthCredentials;

  constructor(public creds: UserInfo) {
  }
}

export class GetUserInfo implements Action {
  readonly type = AuthActionTypes.GetUserInfo;
}

export type AuthActions =
  LoadAuth
  | SaveAuthToken
  | LoginWithAuthToken
  | SaveAuthCredentials;
