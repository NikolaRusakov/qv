import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(db: AngularFirestore) {
    db.doc('chat')
      .valueChanges()
      .subscribe(item => {
        console.log(item);
      });
  }
}
