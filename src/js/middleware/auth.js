import { auth } from "../library/firebase/auth";

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
    alert(user ? user.email : "not authenticated");
  });

	return action => next(action);
};