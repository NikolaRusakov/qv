import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';
import { VoteActionTypes } from './vote.actions';

@Injectable()
export class VoteEffects {
  @Effect()
  loadVotes$ = this.actions$.pipe(
    ofType(VoteActionTypes.LoadVotes),
    tap(item => console.log(item)),
    map(value => ({ type: VoteActionTypes.SaveVotes, payload: value })),
  );

  constructor(
    private actions$: Actions,
    private readonly afs: AngularFirestore,
  ) {}
}
