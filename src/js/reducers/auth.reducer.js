import { AUTH_STATE_CHANGE } from "../constants/auth.constants";

let initialState = {
  user: undefined
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_STATE_CHANGE:
      return {
        user: action.value
      }
    default:
      return state;
  }
}