import { AuthActions, AuthActionTypes } from './auth.actions';

interface QvoteUserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid?: string;
  login: boolean;
}

export interface State {
  auth: string;
  credentials: QvoteUserInfo;
}

export const initialState: State = {
  auth: '',
  credentials: {
    phoneNumber: null,
    providerId: '',
    photoURL: null,
    email: null,
    displayName: null,
    login: false,
  },
};

export function reducer(state = initialState, action: AuthActions): State {
  console.log(state);
  console.log(action.type);
  switch (action.type) {
    case AuthActionTypes.LoadAuth: {
      return {
        ...state,
      };
    }
    case AuthActionTypes.SaveAuthToken: {
      return {
        ...state,
        auth: action.token,
      };
    }
    case AuthActionTypes.SaveAuthCredentials: {
      const {
        displayName,
        email,
        photoURL,
        providerId,
        phoneNumber,
      } = action.creds;
      return {
        ...state,
        credentials: {
          displayName,
          email,
          phoneNumber,
          photoURL,
          providerId,
          login: true,
        },
      };
    }
    case AuthActionTypes.LogoutFromAppSuccess: {
      return {
        ...state,
        credentials: {
          phoneNumber: null,
          providerId: '',
          photoURL: null,
          email: null,
          displayName: null,
          login: false,
        },
      };
    }

    default:
      return state;
  }
}
