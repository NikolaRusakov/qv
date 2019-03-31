import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { map, tap } from 'rxjs/operators';
import { DialogsActionTypes, DialogsActions } from './dialogs.actions';
import { InfoSnackbarComponent } from '@app/components/info-snackbar/info-snackbar.component';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class DialogsEffects {
  @Effect({ dispatch: false })
  loadDialogs$ = this.actions$.pipe(
    ofType(DialogsActionTypes.ShowDialog),
    tap(item => console.log(item)),
    map(({ config }) =>
      this.snackBar.openFromComponent(InfoSnackbarComponent, config),
    ),
  );

  constructor(
    private actions$: Actions<DialogsActions>,
    private readonly snackBar: MatSnackBar,
  ) {}
}
