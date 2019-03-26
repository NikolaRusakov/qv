import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  AuthActionTypes,
  SaveAuthToken,
  SaveAuthCredentials,
} from './auth.actions';
import { map, tap, switchMap, filter } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, UserInfo } from 'firebase/app';

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
    map(({token}) => ({type: AuthActionTypes.LoginWithAuthToken, token})),
  );

  @Effect()
  loginWithAuthToken$ = this.actions$.pipe(
    ofType<SaveAuthToken>(AuthActionTypes.LoginWithAuthToken),
    map(({token}) => {
      this.afAuth.auth.signInWithCustomToken(token);
      const res = this.afAuth.auth.currentUser;
      const {
        displayName,
        email,
        photoURL,
        providerId,
        phoneNumber,
      } = res;
      return {
        displayName,
        email,
        phoneNumber,
        photoURL,
        providerId,
      };
    }),
    tap(item => console.log(item)),
    map((creds: UserInfo) => {
      return new SaveAuthCredentials({
        ...creds,
      });
    }),
  );

  // this.afAuth.auth.
  /*
  @Effect()
  loginAuth$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginWithAuthToken),
    tap(item => console.log(item)),
    map(({token}) => ({type: AuthActionTypes.LoginWithAuthToken, token})),
  );
  */

  constructor(private actions$: Actions, private afAuth: AngularFireAuth) {
  }
}
