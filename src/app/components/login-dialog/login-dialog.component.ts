import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserLoginModel } from '@app/models/user-login.model';
import * as actionAuth from '@app/features/auth/auth.actions';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'qv-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  user = this.data;

  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: UserLoginModel = { password: '', username: '' },
    private fb: FormBuilder,
  ) {}

  sendCreds(): void {
    console.warn(this.userForm.valid);
    if (this.userForm.valid) {
      this.store.dispatch(
        new actionAuth.LoginToMattermost(this.userForm.getRawValue()),
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
