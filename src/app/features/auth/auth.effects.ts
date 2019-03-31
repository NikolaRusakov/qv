import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  AuthActionTypes,
  SaveAuthCredentials,
  LogoutFromAppSuccess,
} from './auth.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { loginAndGetUser } from '@app/utils';
import { UserCustomToken } from '@app/models/user-login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { from } from 'rxjs';

@Injectable()
export class AuthEffects {
  /* @Effect()
  loadAuth$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoadAuth),
    tap(item => console.log(item)),
    switchMap(value => [
        // {type: AuthActionTypes.SaveAuthToken, token: value},
        // {type: AuthActionTypes.LoginWithAuthToken, token: value},

      ])
  );*/

  @Effect()
  saveAuthToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.SaveAuthToken),
    tap(item => console.log(item)),
    map(({ token }) => ({ type: AuthActionTypes.LoginWithAuthToken, token })),
  );

  @Effect()
  loginToMattermost = this.actions$.pipe(
    ofType(AuthActionTypes.LoginToMattermost),
    switchMap(({ creds: { username, password } }) => {
      return from(loginAndGetUser(username, password));
    }),
    tap(item => console.log(item)),
    map(user =>
      this.httpClient
        .post<UserCustomToken>(`${environment.functions.auth}/auth`, {
          user,
        })
        .pipe(map<UserCustomToken, string>(({ customToken }) => customToken)),
    ),
    switchMap(token => token),
    tap(item => console.log(item)),
    map(token => ({
      type: AuthActionTypes.LoginWithAuthToken,
      token,
    })),
  );

  @Effect()
  loginWithAuthToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginWithAuthToken),
    map(({ token }) =>
      from(this.afAuth.auth.signInWithCustomToken(token)).pipe(
        map(user => user),
      ),
    ),
    switchMap(creds => creds),
    tap(item => console.log(item)),
    map(
      ({
        user: { displayName, email, photoURL, phoneNumber, providerId, uid },
      }) => {
        return new SaveAuthCredentials({
          displayName,
          email,
          photoURL,
          providerId,
          phoneNumber,
          uid,
        });
      },
    ),
  );

  @Effect()
  logoutFromApp$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutFromApp),
    map(() => this.afAuth.auth.signOut()),
    map(() => new LogoutFromAppSuccess()),
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private httpClient: HttpClient,
  ) {}
}
