import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  AuthActionTypes,
  SaveAuthCredentials,
  LogoutFromAppSuccess,
  LoginToMattermost,
  LoginToMattermostFailed,
  SaveAuthToken,
} from './auth.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { loginAndGetUser } from '@app/utils';
import { UserCustomToken, UserLoginModel } from '@app/models/user-login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { from } from 'rxjs';
import { ShowDialog } from '@app/features/dialogs/dialogs.actions';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { AuthService } from '@app/services/auth.service';

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
    map(user => {
      return this.httpClient
        .post<UserCustomToken>(`${environment.functions.auth}/auth`, {
          user,
        })
        .pipe(map<UserCustomToken, string>(({ customToken }) => customToken));
    }),
    switchMap(token => token),
    tap(item => console.log(item)),
    map(token => ({
      type: AuthActionTypes.LoginWithAuthToken,
      token,
    })),
  );

  @Effect()
  loginToMattermost = this.actions$.pipe(
    ofType<LoginToMattermost>(AuthActionTypes.LoginToMattermost),
    tap(_ =>
      this.store.dispatch(
        new ShowDialog({
          duration: 3500,
          data: {
            message: 'Logging to Mattermost',
          },
          verticalPosition: 'top',
        }),
      ),
    ),
    tap(item => console.log(item)),

    switchMap(({ creds }) => {
      return this.authService.loginMattermost(creds);
    }),
    tap(item => console.log(item)),
    map((user: { [key: string]: any } | LoginToMattermostFailed) => {
      if (user instanceof LoginToMattermostFailed) {
        console.log(user);
        this.store.dispatch(
          new ShowDialog({
            duration: 3500,
            data: {
              message: 'Wrong credentials, try again!',
            },
            verticalPosition: 'top',
          }),
        );
        return new LoginToMattermostFailed(user.payload);
      }
      return new SaveAuthToken(user);
    }),
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
    tap(({ user: { displayName } }) =>
      this.store.dispatch(
        new ShowDialog({
          duration: 2000,
          data: {
            message: `You're welcome ${displayName ? ', ' + displayName : ''}`,
            // action: 'trigger',
            // caller: () => console.log('action triggerd'),
          },
          verticalPosition: 'top',
        }),
      ),
    ),
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
    tap(() => this.afAuth.auth.signOut()),
    map(() => new LogoutFromAppSuccess()),
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private store: Store<State>,
    private authService: AuthService,
  ) {}
}
