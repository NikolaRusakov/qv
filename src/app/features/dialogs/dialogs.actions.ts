import { Action } from '@ngrx/store';
import { MatSnackBarConfig } from '@angular/material';

export enum DialogsActionTypes {
  ShowDialog = '[Dialogs] Load Dialogss',
}

export class ShowDialog implements Action {
  readonly type = DialogsActionTypes.ShowDialog;

  constructor(
    public config: MatSnackBarConfig,
  ) {}
}

export type DialogsActions = ShowDialog;
