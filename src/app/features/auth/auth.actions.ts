import { Action } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { UserLoginModel } from '@app/models/user-login.model';

export enum AuthActionTypes {
  LoadAuth = '[Auth] Load Auth',
  LogoutFromApp = '[Auth Logout] Logout From The App',
  LogoutFromAppSuccess = '[Auth Logout Success] Logout Successful',
  GetUserInfo = '[Auth User Get] User Info',
  SaveAuthToken = '[Auth Save] Save Auth Token',
  LoginToMattermost = '[Auth Mattermost] Login To Mattermost',
  LoginToMattermostFailed = '[Auth Mattermost Fail] Login To Mattermost Failed',
  LoginWithAuthToken = '[Auth Login] Login With Auth Token',
  SaveAuthCredentials = '[Auth Save Credentials] Save Auth Credentials',
}

export class LoadAuth implements Action {
  readonly type = AuthActionTypes.LoadAuth;
}

export class SaveAuthToken implements Action {
  readonly type = AuthActionTypes.SaveAuthToken;

  constructor(public readonly user: { [key: string]: any }) {}
}

export class LoginWithAuthToken implements Action {
  readonly type = AuthActionTypes.LoginWithAuthToken;

  constructor(public readonly token: string) {}
}

export class SaveAuthCredentials implements Action {
  readonly type = AuthActionTypes.SaveAuthCredentials;

  constructor(public creds: UserInfo) {}
}

export class GetUserInfo implements Action {
  readonly type = AuthActionTypes.GetUserInfo;
}

export class LoginToMattermost implements Action {
  readonly type = AuthActionTypes.LoginToMattermost;
  constructor(public creds: UserLoginModel) {}
}

export class LoginToMattermostFailed implements Action {
  readonly type = AuthActionTypes.LoginToMattermostFailed;
  constructor(public payload: string, public statusCode: string) {}
}

export class LogoutFromApp implements Action {
  readonly type = AuthActionTypes.LogoutFromApp;
}

export class LogoutFromAppSuccess implements Action {
  readonly type = AuthActionTypes.LogoutFromAppSuccess;
}

export type AuthActions =
  | LoadAuth
  | SaveAuthToken
  | LoginWithAuthToken
  | SaveAuthCredentials
  | LoginToMattermost
  | LoginToMattermostFailed
  | LogoutFromApp
  | LogoutFromAppSuccess;
