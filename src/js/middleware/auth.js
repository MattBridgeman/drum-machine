import { auth } from "../library/firebase/auth";
import { authStateChange } from "../actions/auth.actions";

export const supplyAuth = store => next => {
  auth.init();
  auth.onAuthStateChanged(user => {
    // var displayName = user.displayName;
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var uid = user.uid;
    // var phoneNumber = user.phoneNumber;
    // var providerData = user.providerData;
    //user.getIdToken().then(accessToken)
    next(authStateChange(user));
  });

	return action => next(action);
};