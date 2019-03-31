
import { DialogsActions, DialogsActionTypes } from './dialogs.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: DialogsActions): State {
  switch (action.type) {

    case DialogsActionTypes.ShowDialog:
      return state;

    default:
      return state;
  }
}
