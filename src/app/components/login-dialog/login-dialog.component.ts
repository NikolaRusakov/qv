import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserLoginModel } from '@app/models/user-login.model';
import * as actionAuth from '@app/features/auth/auth.actions';
import { select, Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { FormBuilder, Validators } from '@angular/forms';
import { $isLoggedIn } from '@app/features/auth/auth.selectors';
import { map, take, takeWhile, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'qv-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  userForm = this.fb.group({
    login_id: ['', Validators.required],
    password: ['', Validators.required],
  });
  user = this.data;
  isLoggedIn$ = this.store.pipe(select($isLoggedIn));

  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: UserLoginModel = { password: '', login_id: '' },
    private fb: FormBuilder,
  ) {
    this.store
      .pipe(
        select($isLoggedIn),
        // withLatestFrom(this.isLoggedIn$),
        tap(i => console.log(i)),
        // tap(login => {
        //   if (login) {
        //     this.dialogRef.close();
        //   }
        // }),
        // tap(i => console.log(i)),
        takeWhile(logged => logged !== true),
        map(login => login),
      )
      .subscribe(login => {
        console.log(login);
        if (login) {
          this.dialogRef.close();
        }
      });
  }

  sendCreds(): void {
    console.warn(this.userForm.valid);
    if (this.userForm.valid) {
      this.store.dispatch(
        new actionAuth.LoginToMattermost(this.userForm.getRawValue()),
      );

      /*      this.store
        .pipe(
          select($isLoggedIn),
          // withLatestFrom(this.isLoggedIn$),
          map(login => {
            console.log(login);
            if (login) {
              this.dialogRef.close();
            }
            return login;
          }),
          takeWhile(logged => {
            console.log(logged);
            return !logged;
          }),
        )
        .subscribe(login => {
          console.log(login);
          if (login) {
            this.dialogRef.close();
          }
        });*/
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
