import { AUTH_STATE_CHANGE } from "../constants/auth.constants";

export function authStateChange(user) {
	return {
		type: AUTH_STATE_CHANGE,
		value: user
	};
}