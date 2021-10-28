import {Usuario} from '../interfaces/appInterfaces';

// asi va a lucir su state
export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authendicaded';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removerError'}
  | {type: 'notAuthenticated'}
  | {type: 'logOut'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'not-authendicaded',
        token: null,
        errorMessage: action.payload,
      };
    case 'removerError':
      return {
        ...state,
        errorMessage: '',
      };

    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };

    case 'notAuthenticated':
    case 'logOut':
      return {
        ...state,
        status: 'not-authendicaded',
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
