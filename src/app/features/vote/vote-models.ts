import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Vote {
  title: string;
  createdBy: string;
  createdAt: Timestamp;
  question: string;
  answers: VoteAnswers[];
}

interface VoteAnswers {
  amount: number;
  value: number;
  median: number;
  text: string;
}
