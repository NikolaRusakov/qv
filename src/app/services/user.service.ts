import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    // this.users = db.collection('users').valueChanges();
  }
}
