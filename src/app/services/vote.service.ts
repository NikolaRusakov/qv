import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Vote } from '@app/features/vote/vote-models';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private db: AngularFirestore) {}

  async saveVote(vote: Vote): Promise<DocumentReference> {
    const sentVote = {
      ...vote,
      createdAt: Timestamp.now(),
      createdBy: 'Nikola',
    };
    const voteAdded = await this.db.collection('votes').add(sentVote);
    console.log(voteAdded);
    return voteAdded;
  }
}
