import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Vote } from './vote-models';
import { VoteActions, VoteActionTypes } from './vote.actions';

// export interface State {
//   answers: Vote[];
// }

// export const initialState: State = {
//   answers: []
// };
const adapter = createEntityAdapter<Vote>({
  selectId: vote => vote.createdAt.seconds,
  sortComparer: (voteA: Vote, voteB: Vote) =>
    voteA.createdAt.seconds
      .toLocaleString()
      .localeCompare(voteB.createdAt.seconds.toLocaleString()),
});
export const initialState: State = adapter.getInitialState();

/*export interface State {
  goals: Goal[] | null;
  isLoading: boolean;
  error: string;
}*/
export type State = EntityState<Vote>;

export function reducer(state = initialState, action: VoteActions): State {
  console.log(action);
  switch (action.type) {
    case VoteActionTypes.LoadVotes: {
      return state;
    }
    case VoteActionTypes.SaveVotes: {
      return adapter.upsertMany(action.payload, state);
    }
    case VoteActionTypes.ChangeVotes: {
      return adapter.upsertMany(action.payload, state);
    }
    default:
      return state;
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
