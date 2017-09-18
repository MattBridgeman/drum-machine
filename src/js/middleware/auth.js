import { auth } from "../library/firebase/auth";

export const supplyAuth = store => next => {
	auth.init();

	return action => next(action);
};