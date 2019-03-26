import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as actionAuth from '@app/features/auth/auth.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { LoginDialogComponent } from '@app/components/login-dialog/login-dialog.component';
import { UserLoginModel } from '@app/models/user-login.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { $selectUserInfo } from '@app/features/auth/auth.selectors';

@Component({
  selector: 'qv-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  userInfo$ = this.store.pipe(select($selectUserInfo));

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    public readonly afAuth: AngularFireAuth,
    private readonly store: Store<State>,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

  login() {
    const h = 640,
      w = 480;
    const dualScreenLeft = window.screenLeft;
    const dualScreenTop = window.screenTop;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;

    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const left = width / 2 - w / 2 + dualScreenLeft;
    const top = height / 2 - h / 2 + dualScreenTop;

    const oauthDialog = window.open(
      environment.oauth2.issuer,
      'Mattermost Authentication',
      `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`,
    );

    const onMessage = e => {
      if (e.origin === location.origin) {
        const {
          data: { token },
        } = e;
        if (token !== undefined) {
          console.log(token);
          this.store.dispatch(new actionAuth.SaveAuthToken(e.data.token));
        }
      }
    };
// TODO remove if it's useless for OAuth
    oauthDialog.addEventListener('message', onMessage, false);
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '360px',
      height: '480px',
    });

    dialogRef.afterClosed().pipe(
      map(({ username, password }: UserLoginModel) => {
        console.log('The dialog was closed');
        this.store.dispatch(
          new actionAuth.LoginToMattermost({ username, password }),
        );
      }),
    );
  }

  logoutUser(username?: string) {
    const snackBarRef = this.snackBar.open(
      `${username ? username + ',' : ''} You're being logged out`,
      'Login again',
      {
        duration: 2500,
        verticalPosition: 'top',
      },
    );
    snackBarRef
      .onAction()
      .pipe(take(1))
      .subscribe(_ => {
        this.openLoginDialog();
      });

    this.store.dispatch(new actionAuth.LogoutFromApp());
  }
}
