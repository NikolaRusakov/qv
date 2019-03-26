import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatBottomSheet } from '@angular/material';
import * as actionAuth from '@app/features/auth/auth.actions';
import { Vote } from '@app/features/vote/vote-models';
import { $selectVoteEntities, State } from '@app/reducers';
import { InitService } from '@app/services/init.service';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'qv-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [
    trigger('itemState', [
      transition('* <=> *', [

        query(':enter', [
          style({ opacity: 0 }),
          stagger(250, [
            animate(
              '0.5s',
              style({ transform: 'translateX(-100%)', opacity: .25 }),
            ),
          ]),
        ]),
        query(':leave', [
          stagger(250, [
            animate(
              '0.5s',
              style({ transform: 'translateX(100%)', opacity: 0 }),
            ),
          ]),
        ], { optional: true }),
      ]),
      /*transition('void => *', [
        stagger(250, [
          style({ transform: 'translateX(-100%)' }),
          animate('500ms ease-out'),
        ]),
      ]),
      transition('* => void', [
        animate('500ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),*/
    ]),
  ],
})
export class DashboardComponent {
  votes: Observable<Vote[]> = this.store.pipe(select($selectVoteEntities)).pipe(
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
  ) {
    this.init.fetchVotes();
  }


}
