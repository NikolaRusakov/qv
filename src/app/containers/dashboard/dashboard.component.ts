import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatBottomSheet } from '@angular/material';
import * as actionAuth from '@app/features/auth/auth.actions';
import { Vote } from '@app/features/vote/vote-models';
import { selectVoteEntities, State } from '@app/reducers';
import { InitService } from '@app/services/init.service';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'qv-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  votes: Observable<Vote[]> = this.store.pipe(select(selectVoteEntities)).pipe(
    map(item => {
      console.log(Object.values(item));
      return Object.values(item);
    }),
  );

  constructor(
    private store: Store<State>,
    public afAuth: AngularFireAuth,
    private bottomSheet: MatBottomSheet,
    private readonly init: InitService,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.init.fetchVotes();
  }

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
      `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`
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

    oauthDialog.addEventListener('message', onMessage);
  }

  logout() {}
}
