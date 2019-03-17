import { AuthActions, AuthActionTypes } from './auth.actions';

export interface State {
  auth: string;
}

export const initialState: State = {
  auth: '',
};

export function reducer(state = initialState, action: AuthActions): State {
  console.log(state);
  console.log(action.type);
  switch (action.type) {
    case AuthActionTypes.LoadAuth: {
      return {
        ...state
      };
    }
    case AuthActionTypes.SaveAuthToken: {
      return {
        ...state,
        auth: action.token,
      };
    }

    default:
      return state;
  }
}
