import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actionVote from '@app/features/vote/vote.actions';
import * as fromVote from '@app/features/vote/vote.reducer';
import { Vote } from '@app/features/vote/vote-models';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  public channel = new MessageChannel();

  constructor(
    private db: AngularFirestore,
    private store: Store<fromVote.State>,
  ) {}

  fetchVotes(): void {
    this.db
      .collection<Vote>('votes')
      .valueChanges()
      .subscribe(item => {
        console.log(item);
        this.store.dispatch(new actionVote.ChangeVotes(item));
      });
  }
}
