import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AuthActionTypes } from './auth.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  @Effect()
  loadAuth$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoadAuth),
    map(value => ({ type: AuthActionTypes.SaveAuthToken, token: value })),
  );

  constructor(private actions$: Actions) {}
}
